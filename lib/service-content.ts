import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "intake", "pages");
const ARTICLE_SEP = "_______________________________________";

export type ServiceListVariant = "default" | "indications" | "contraindications" | "steps";

export type ServiceBlock =
  | { type: "prose"; title?: string; paragraphs: string[] }
  | { type: "list"; title: string; variant: ServiceListVariant; items: string[] };

export type ParsedServiceArticle = {
  lead: string[];
  blocks: ServiceBlock[];
};

const PROMO_LINE =
  /^(Записаться на |Цены на лечение в стоматологии|Прямо сейчас Вы можете|В нашей клинике всегда доступные|Подробную информацию о стоимости|Выбор клиники «Один|Здесь пациентам предлагаются|В клинике работают опытные)/i;

function isParagraph(line: string) {
  if (line.length >= 88) return true;
  const words = line.split(/\s+/).filter(Boolean).length;
  return words >= 11 && /[.!?]/.test(line);
}

function dropNoiseLine(line: string) {
  const t = line.trim();
  if (!t) return true;
  if (t.startsWith("#") || t.startsWith("URL:")) return true;
  if (/^\+7/.test(t)) return true;
  if (/^Записаться на консультацию:?$/i.test(t)) return true;
  if (/^Прикрепить файл/i.test(t)) return true;
  if (/^\*\s*—/.test(t) || /^\*не суммируется/i.test(t)) return true;
  if (/^Нажимая кнопку/i.test(t)) return true;
  if (/^Политик/i.test(t)) return true;
  if (/^Заполните форму/i.test(t)) return true;
  if (/^Или позвоните/i.test(t)) return true;
  if (/^г\.\s*Москва$/i.test(t)) return true;
  if (/^вн\.тер/i.test(t)) return true;
  if (/не суммируется с другими акциями/i.test(t)) return true;
  if (/^Amazing white/i.test(t)) return true;
  if (/^Акция выходного дня/i.test(t)) return true;
  if (/^Семейная гигиена$/i.test(t)) return true;
  if (/^При записи двоих/i.test(t)) return true;
  if (/^Гигиена полости рта за \d+/i.test(t)) return true;
  if (/^Отбеливание зубов$/i.test(t)) return true;
  if (PROMO_LINE.test(t)) return true;
  return false;
}

function extractArticleLines(raw: string) {
  let text = raw.replace(/\r/g, "");
  text = text.split("Записаться на бесплатную консультацию")[0] ?? text;
  const sepAt = text.lastIndexOf(ARTICLE_SEP);
  if (sepAt >= 0) text = text.slice(sepAt + ARTICLE_SEP.length);

  let lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !dropNoiseLine(line));

  const firstPara = lines.findIndex(isParagraph);
  if (firstPara > 0) lines = lines.slice(firstPara);

  const promoAt = lines.findIndex((line) => PROMO_LINE.test(line));
  if (promoAt >= 0) lines = lines.slice(0, promoAt);

  return lines;
}

function listVariant(title: string): ServiceListVariant {
  const t = title.toLowerCase();
  if (/противопоказ/.test(t)) return "contraindications";
  if (/показан/.test(t)) return "indications";
  if (/этап/.test(t)) return "steps";
  return "default";
}

const HEADING_START =
  /^(виды|этапы|показания|противопоказания|необходимость|преимущества|причины|как |что такое|особенности|методы|стоимость|когда |зачем |результаты?|подготовк|глубокое |насыщение )/i;

function isHeading(line: string, next?: string) {
  if (isParagraph(line)) return false;
  if (line.endsWith(";") || /\.$/.test(line)) return false;
  if (line.length > 110) return false;
  if (/^(показания|противопоказания)\b/i.test(line) || (line.endsWith(":") && line.length < 80)) return true;
  if (/^[а-яёa-z]/.test(line)) return false;
  if (next && /^(показания|противопоказания)\b/i.test(next)) return false;
  if (HEADING_START.test(line)) return true;
  if (next && isParagraph(next) && line.length <= 86) return true;
  return false;
}

function parseBlocks(lines: string[]): ServiceBlock[] {
  const blocks: ServiceBlock[] = [];
  let i = 0;

  const pushProse = (title: string | undefined, paragraphs: string[]) => {
    if (!paragraphs.length) return;
    blocks.push({ type: "prose", title, paragraphs });
  };

  while (i < lines.length) {
    const line = lines[i]!;
    const next = lines[i + 1];

    if (isHeading(line, next)) {
      const title = line.replace(/:$/, "");
      i += 1;
      const items: string[] = [];
      const paragraphs: string[] = [];

      while (i < lines.length) {
        const current = lines[i]!;
        const following = lines[i + 1];
        if (isHeading(current, following)) break;
        if (isParagraph(current)) {
          if (items.length) break;
          paragraphs.push(current);
          i += 1;
          continue;
        }
        items.push(current.replace(/[.;]$/, ""));
        i += 1;
      }

      if (items.length && !paragraphs.length) {
        blocks.push({ type: "list", title, variant: listVariant(title), items });
      } else if (paragraphs.length) {
        pushProse(title, paragraphs);
        if (items.length) {
          blocks.push({ type: "list", title, variant: listVariant(title), items });
        }
      } else if (title) {
        blocks.push({ type: "prose", title, paragraphs: [] });
      }
      continue;
    }

    const paragraphs: string[] = [];
    while (i < lines.length) {
      const current = lines[i]!;
      const following = lines[i + 1];
      if (isHeading(current, following)) break;
      if (isParagraph(current)) paragraphs.push(current);
      i += 1;
    }
    pushProse(undefined, paragraphs);
  }

  return blocks.filter((block) => {
    if (block.type === "list") return block.items.length > 0;
    if (block.paragraphs.length) return true;
    return /^(виды|этапы)\b/i.test(block.title ?? "");
  });
}

export function parseServiceArticle(servicePath: string, fallback = ""): ParsedServiceArticle {
  const file = path.join(CONTENT_DIR, `cat__${servicePath.replaceAll("/", "__")}.md`);
  const raw = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : fallback;
  const lines = extractArticleLines(raw);
  if (!lines.length) {
    const fallbackLines = fallback
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
    return { lead: fallbackLines.slice(0, 2), blocks: fallbackLines.length ? parseBlocks(fallbackLines) : [] };
  }

  const blocks = parseBlocks(lines);
  const lead: string[] = [];
  const rest: ServiceBlock[] = [];

  for (const block of blocks) {
    if (lead.length < 2 && block.type === "prose" && !block.title && rest.length === 0) {
      const take = block.paragraphs.slice(0, 2 - lead.length);
      lead.push(...take);
      const leftover = block.paragraphs.slice(take.length);
      if (leftover.length) rest.push({ type: "prose", paragraphs: leftover });
      continue;
    }
    rest.push(block);
  }

  if (!lead.length && fallback) {
    lead.push(fallback.replace(/\s+/g, " ").trim());
  }

  return { lead, blocks: rest };
}

export function getDetailedServiceDescription(servicePath: string, fallback: string) {
  const article = parseServiceArticle(servicePath, fallback);
  return article.lead.join("\n\n") || fallback;
}
