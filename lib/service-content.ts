import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "intake", "pages");

export function getDetailedServiceDescription(servicePath: string, fallback: string) {
  const file = path.join(CONTENT_DIR, `cat__${servicePath.replaceAll("/", "__")}.md`);
  if (!fs.existsSync(file)) return fallback;
  let text = fs.readFileSync(file, "utf8");
  const articleStart = text.lastIndexOf("_______________________________________");
  if (articleStart >= 0) text = text.slice(articleStart + "_______________________________________".length);
  text = text.split("Записаться на бесплатную консультацию")[0] ?? text;
  const cleaned = text
    .replace(/^#.*$/gm, "")
    .replace(/^URL:.*$/gm, "")
    .replace(/^\s*(Услуги|Главная|Пациентам|Записаться на консультацию:?).*$/gim, "")
    .replace(/^\s*\+7.*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return cleaned || fallback;
}

