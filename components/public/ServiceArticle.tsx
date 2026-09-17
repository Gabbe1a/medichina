import type { ParsedServiceArticle, ServiceBlock, ServiceListVariant } from "@/lib/service-content";

const LIST_STYLES: Record<
  ServiceListVariant,
  { box: string; kicker: string; mark: string }
> = {
  indications: {
    box: "border-[#d8cfc2] bg-[#fbf9f6]",
    kicker: "Можно",
    mark: "text-chocolate",
  },
  contraindications: {
    box: "border-[#e6c9b3] bg-[#fdf8f4]",
    kicker: "Осторожно",
    mark: "text-[#8a3c0e]",
  },
  steps: {
    box: "border-[#eae3d9] bg-white",
    kicker: "Как проходит",
    mark: "text-chocolate",
  },
  default: {
    box: "border-[#eae3d9] bg-white",
    kicker: "Подробнее",
    mark: "text-chocolate",
  },
};

function ListCard({ block }: { block: Extract<ServiceBlock, { type: "list" }> }) {
  const style = LIST_STYLES[block.variant];
  return (
    <section className={`rounded-xl border p-5 shadow-2xs md:p-6 ${style.box}`}>
      <p className={`text-[11px] font-extrabold uppercase tracking-[0.2em] ${style.mark}`}>{style.kicker}</p>
      <h2 className="mt-2 text-xl font-extrabold tracking-tight text-navy md:text-2xl">{block.title}</h2>
      {block.variant === "steps" ? (
        <ol className="mt-4 space-y-3">
          {block.items.map((item, index) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f7f1eb] border border-[#eae3d9] text-[11px] font-black text-chocolate">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pt-0.5 font-medium text-navy">{item}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span className={`mt-0.5 font-black ${style.mark}`}>{block.variant === "contraindications" ? "–" : "•"}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ProseCard({ block }: { block: Extract<ServiceBlock, { type: "prose" }> }) {
  if (!block.title && !block.paragraphs.length) return null;
  if (block.title && !block.paragraphs.length) {
    return (
      <h2 className="rounded-xl bg-chocolate px-5 py-3 text-lg font-extrabold tracking-tight text-white md:px-6 md:text-xl">
        {block.title}
      </h2>
    );
  }
  return (
    <section className="rounded-xl border border-[#eae3d9] bg-white p-5 shadow-2xs md:p-7">
      {block.title ? <h2 className="text-xl font-extrabold tracking-tight text-navy md:text-2xl">{block.title}</h2> : null}
      <div className={block.title ? "mt-3 space-y-3" : "space-y-3"}>
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-muted md:text-[15px] md:leading-7">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ServiceArticle({ article }: { article: ParsedServiceArticle }) {
  const blocks = article.blocks.filter((block) => block.type !== "prose" || block.title || block.paragraphs.length);
  if (!blocks.length) return null;

  const rows: ServiceBlock[][] = [];
  for (let i = 0; i < blocks.length; i += 1) {
    const current = blocks[i]!;
    const next = blocks[i + 1];
    if (
      current.type === "list" &&
      next?.type === "list" &&
      current.variant === "indications" &&
      next.variant === "contraindications"
    ) {
      rows.push([current, next]);
      i += 1;
      continue;
    }
    rows.push([current]);
  }

  return (
    <div className="mt-8 space-y-4">
      {rows.map((row, index) =>
        row.length === 2 ? (
          <div key={`pair-${index}`} className="grid gap-4 md:grid-cols-2">
            {row.map((block) =>
              block.type === "list" ? <ListCard key={`${block.title}-${block.items[0]}`} block={block} /> : null,
            )}
          </div>
        ) : row[0]?.type === "list" ? (
          <ListCard key={`${row[0].title}-${row[0].items[0]}`} block={row[0]} />
        ) : row[0]?.type === "prose" ? (
          <ProseCard key={`${row[0].title ?? "p"}-${index}`} block={row[0]} />
        ) : null,
      )}
    </div>
  );
}
