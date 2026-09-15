import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";

const prisma = new PrismaClient();

const INTAKE = path.join(process.cwd(), "content", "intake");
const PUBLIC = path.join(process.cwd(), "public");

function readIntake(name: string) {
  return fs.readFileSync(path.join(INTAKE, name), "utf8");
}

function servicePath(url: string) {
  return url.replace(/\/$/, "").replace("https://superdentos.ru/cat/", "");
}

function topSlugFromPath(servicePathValue: string) {
  return servicePathValue.split("/")[0] ?? servicePathValue;
}

function uniqueSlug(pathValue: string) {
  return pathValue.replaceAll("/", "__");
}

function cleanDoctorBio(raw: string, name: string) {
  const junk = [
    /Продолжая использовать этот сайт[\s\S]*$/i,
    /г\. Москва[\s\S]*$/i,
    /\+7 \(495\).*$/gm,
    /Понятно/g,
    /Фото работ[\s\S]*$/i,
    /условиями обработки[\s\S]*$/i,
    /, необходимых для аналитики[\s\S]*$/i,
  ];

  let text = raw;
  for (const pattern of junk) text = text.replace(pattern, "");

  const lines = text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((line) => line !== name)
    .filter((line) => !line.includes("стоматология «Один к Одному» на Войковской"))
    .filter((line) => !line.startsWith("https://"));

  return lines.join("\n");
}

function parseDoctors(markdown: string) {
  const blocks = markdown.split(/\n## /).slice(1);
  return blocks.map((block, index) => {
    const [titleLine, ...rest] = block.split("\n");
    const name = titleLine.trim();
    const role =
      rest.join("\n").match(/\*\*Должность \/ специализация:\*\*\s*(.+)/)?.[1]?.trim() ??
      "Специалист";
    const photoLine = rest.join("\n").match(/\*\*Фото:\*\*\s*(.+)/)?.[1] ?? "";
    const photoName = path.basename(photoLine.replace(/`/g, "").trim());
    const bioRaw = rest.join("\n").split("### Биография / описание")[1] ?? "";
    const slug = photoName.replace(/\.(jpe?g|png)$/i, "");

    // Extract detailed education and experience
    let experience = "Опыт более 10 лет";
    if (bioRaw.includes("Стаж 30 лет")) experience = "Стаж 30 лет";
    else if (bioRaw.includes("12 лет практики") || bioRaw.includes("2012")) experience = "Практика с 2012 года (14+ лет)";
    else if (bioRaw.includes("2002")) experience = "Практика с 2002 года (24 года)";
    else if (bioRaw.includes("2004")) experience = "Практика с 2004 года (22 года)";
    else if (bioRaw.includes("2008")) experience = "Практика с 2008 года (18 лет)";
    else if (bioRaw.includes("1995")) experience = "Практика с 1995 года (31 год)";

    // Extract education block
    const educationMatch = bioRaw.match(/Обучение:[\s\S]*?(?=Дополнительное обучение|Моя улыбка|$)/i);
    const education = educationMatch
      ? educationMatch[0].replace(/Обучение:/i, "").trim().slice(0, 300)
      : "Высшее медицинское образование, профильные сертификаты и курсы повышения квалификации.";

    return {
      slug: slug || `doctor-${index + 1}`,
      name,
      role,
      specialty: role.split(",")[0]?.trim() || role,
      experience,
      education,
      bio: cleanDoctorBio(bioRaw, name),
      photoUrl: `/media/doctors/${photoName}`,
      sortOrder: index,
    };
  });
}

function parseReviews(markdown: string) {
  const blocks = markdown.split(/\n## Отзыв /).slice(1);
  return blocks.map((block, index) => {
    const author = block.match(/\*\*Автор:\*\*\s*(.+)/)?.[1]?.trim() ?? "Пациент";
    const dateLabel = block.match(/\*\*Дата:\*\*\s*(.+)/)?.[1]?.trim() ?? "";
    const rating = Number(block.match(/\*\*Оценка:\*\*\s*(\d+)/)?.[1] ?? 5);
    const text = block
      .replace(/^[^\n]*\n/, "")
      .replace(/\*\*Автор:\*\*.+\n/, "")
      .replace(/\*\*Дата:\*\*.+\n/, "")
      .replace(/\*\*Оценка:\*\*.+\n/, "")
      .replace(/^---\s*$/gm, "")
      .trim();
    return { author, dateLabel, rating, text, sortOrder: index };
  });
}

type ParsedService = {
  title: string;
  path: string;
  slug: string;
  topSlug: string;
  parentPath: string | null;
  sortOrder: number;
  depth: number;
};

function parseServiceTree(markdown: string) {
  const nav = markdown.split("# Прайс-лист")[0] ?? markdown;
  const lines = nav.split("\n");
  const items: ParsedService[] = [];
  const stack: { depth: number; path: string }[] = [];
  let order = 0;

  for (const line of lines) {
    const match = line.match(/^(\s*)-\s+\*\*(.+?)\*\*\s+—\s+`([^`]+)`/);
    if (!match) continue;
    const depth = Math.floor((match[1]?.length ?? 0) / 2);
    const title = match[2].trim();
    const url = match[3].trim();
    const pathValue = servicePath(url);
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
    const parentPath = stack.length ? stack[stack.length - 1].path : null;
    stack.push({ depth, path: pathValue });
    items.push({
      title,
      path: pathValue,
      slug: uniqueSlug(pathValue),
      topSlug: topSlugFromPath(pathValue),
      parentPath,
      sortOrder: order++,
      depth,
    });
  }

  return items;
}

function parseServiceDescriptions(markdown: string) {
  const part = markdown.split("# Описания разделов услуг")[1] ?? "";
  const chunks = part.split(/\n## /).slice(1);
  const map = new Map<string, string>();

  for (const chunk of chunks) {
    const title = chunk.split("\n")[0]?.trim() ?? "";
    const url = chunk.match(/URL:\s*(https?:\/\/\S+)/)?.[1] ?? "";
    const body = chunk
      .replace(/^[^\n]+\n/, "")
      .replace(/URL:\s*.+\n/, "")
      .trim();
    if (url) map.set(servicePath(url), body);
    if (title) map.set(title.toLowerCase(), body);
  }
  return map;
}

function parsePrices(markdown: string) {
  const part = markdown.split("# Прайс-лист")[1]?.split("# Описания разделов услуг")[0] ?? "";
  const sections = part.split(/\n## /).slice(1);
  const items: {
    title: string;
    price: number;
    categoryName: string;
    code: string;
    sortOrder: number;
  }[] = [];

  let sortOrder = 0;
  for (const section of sections) {
    const categoryName = section.split("\n")[0]?.trim() ?? "Прайс";
    const rows = section.match(/^\| (?!-)(?!Услуга)(.+?) \| (.+?) \|$/gm) ?? [];
    for (const row of rows) {
      const cells = row
        .slice(1, -1)
        .split("|")
        .map((cell) => cell.trim());
      const title = cells[0] ?? "";
      const rawPrice = (cells[1] ?? "").replace(/[^\d]/g, "");
      if (!title || !rawPrice) continue;
      const codeMatch = title.match(/^([A-Za-zА-Яа-яA-Z0-9.]+)\s+/);
      items.push({
        title,
        price: Number(rawPrice),
        categoryName,
        code: codeMatch?.[1] ?? "",
        sortOrder: sortOrder++,
      });
    }
  }
  return items;
}

function parseGallery() {
  const dir = path.join(PUBLIC, "media", "gallery");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => !name.includes("_209x125"))
    .sort()
    .map((name, index) => ({
      url: `/media/gallery/${name}`,
      alt: "Интерьер и приём в клинике «Один к Одному»",
      sortOrder: index,
    }));
}

const ABOUT_BODY = `
Стоматологическая клиника «Один к Одному» работает у метро Войковская уже больше пятнадцати лет. Мы ведём пациентов от первой консультации до финальной реставрации: гигиена, терапия, хирургия, имплантация, ортодонтия и протезирование — в одном здании, без «конвейера».

Нам важно не закрыть приём любой ценой, а выбрать безопасный и предсказуемый план. Поэтому диагностика опирается на цифровые снимки, а лечение — на проверенные протоколы и материалы экспертного класса. Если зуб можно сохранить, мы сначала ищем зубосохраняющий путь.

Клиника лицензирована (ООО «Ноли Ноцэрэ+», лицензия Л041-01137-77/03335406). Приём ежедневно с 09:00 до 21:00. До нас пять минут пешком от Войковской: ориентир — вывеска Сбербанка, второй подъезд.
`.trim();

const PRIVACY_BODY = `
Политика обработки персональных данных составлена в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ и определяет порядок обработки данных посетителей сайта https://superdentos.ru оператором ООО «Ноли Ноцэрэ+».

Оператор обрабатывает фамилию, имя, отчество, телефон и адрес электронной почты, чтобы заключить и исполнить договор на медицинские услуги, ответить на заявку и связаться с пациентом. Правовые основания — согласие субъекта, исполнение договора и требования законодательства РФ.

Персональные данные не передаются третьим лицам, кроме случаев, прямо предусмотренных законом или необходимых для исполнения договора при наличии согласия. Актуализировать сведения или отозвать согласие можно письмом на odinkodin@yandex.ru с пометкой «Актуализация персональных данных» или «Отзыв согласия на обработку персональных данных».

Полный текст политики доступен в PDF: /media/legal/politika_personalnyh_dannyh.pdf
`.trim();

const LEGAL_BODY = `
## Общие сведения

- Юридическое лицо: ООО «Ноли Ноцэрэ+»
- ОГРН: 1257700116530
- Адрес: 125171, г. Москва, вн.тер.г. муниципальный округ Войковский, пер. 1-й Новоподмосковный, д. 2/1
- Лицензия: Л041-01137-77/03335406, выдана Департаментом здравоохранения г. Москвы
- Режим: ежедневно 09:00–21:00
- Приём главным врачом: вторник и четверг, 16:00–18:00
- Телефон: +7 (495) 988-35-35

## Виды помощи по лицензии

Первичная доврачебная помощь: рентгенология, сестринское дело, стоматология, стоматология профилактическая. Амбулаторная помощь: анестезиология и реаниматология, ортодонтия, стоматология общей практики, ортопедическая, терапевтическая и хирургическая стоматология.

Скан лицензии: /media/legal/license_1.jpg и /media/legal/license_2.jpg
`.trim();

const FAQS = [
  {
    question: "Как быстро можно попасть на консультацию?",
    answer:
      "Клиника принимает ежедневно с 09:00 до 21:00. Оставьте заявку на сайте или напишите в WhatsApp — администратор подберёт ближайшее окно к нужному специалисту.",
  },
  {
    question: "Нужен ли снимок перед лечением?",
    answer:
      "Для точного плана почти всегда нужна диагностика: прицельный снимок или ортопантомограмма. В клинике стоит оборудование Sirona, снимок можно сделать в тот же визит.",
  },
  {
    question: "Больно ли лечить зубы у вас?",
    answer:
      "Большинство процедур проводим с современной местной анестезией. Если тревожность сильная, обсуждаем седацию или лечение во сне — решение принимает врач после осмотра.",
  },
  {
    question: "Можно ли сохранить зуб вместо импланта?",
    answer:
      "Да, если корень и ткани позволяют. Наши хирурги и терапевты сначала оценивают зубосохраняющие варианты и только потом говорят об удалении и имплантации.",
  },
  {
    question: "Сколько приживается имплант?",
    answer:
      "Срок зависит от плотности кости, системы имплантата и нагрузки. Обычно остеоинтеграция занимает от нескольких недель до нескольких месяцев; точные сроки врач называет после КТ и осмотра.",
  },
  {
    question: "Безопасно ли лечиться во время беременности?",
    answer:
      "Да, при правильном протоколе. Мы подбираем анестезию, откладываем плановую эстетику и делаем снимки только по показаниям, с защитой. Отбеливание на этот период не рекомендуем.",
  },
  {
    question: "Есть ли гарантия на работы?",
    answer:
      "На выполненные работы клиника предоставляет юридические гарантии. Срок и условия зависят от вида лечения и соблюдения рекомендаций — их фиксируем в договоре.",
  },
  {
    question: "Как добраться от метро Войковская?",
    answer:
      "Последний вагон из центра, выход №7. Пройдите 80–100 метров вдоль дома, на углу сквера налево до трамвайных путей. Ориентир — вывеска Сбербанка, второй подъезд.",
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@superdentos.ru";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMeNow_32chars_minimum!";
  const adminName = process.env.ADMIN_NAME ?? "Администратор";

  const servicesMd = readIntake("SERVICES.md");
  const teamMd = readIntake("TEAM.md");
  const reviewsMd = readIntake("REVIEWS.md");

  const tree = parseServiceTree(servicesMd);
  const descriptions = parseServiceDescriptions(servicesMd);
  const prices = parsePrices(servicesMd);
  const doctors = parseDoctors(teamMd);
  const reviews = parseReviews(reviewsMd);
  const gallery = parseGallery();

  await prisma.lead.deleteMany();
  await prisma.priceItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.review.deleteMany();
  await prisma.page.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.setting.deleteMany();

  await prisma.setting.create({
    data: {
      id: "site",
      brand: "Один к Одному",
      legalEntity: "ООО «Ноли Ноцэрэ+»",
      address:
        "г. Москва, вн.тер.г. муниципальный округ Войковский, пер. 1-й Новоподмосковный, д. 2/1",
      metro: "Войковская",
      phone1: "+7 (495) 988-35-35",
      phone2: "+7 (495) 797-27-17",
      email: "odinkodin@yandex.ru",
      hours: "09:00–21:00 ежедневно",
      whatsapp: "https://wa.me/79266677219",
      yandexOrgId: "1106402414",
      lon: 37.503535,
      lat: 55.81656,
      rating: 4.9,
      reviewsCount: 252,
      ratingsCount: 413,
      license: "Л041-01137-77/03335406",
      ogrn: "1257700116530",
      metrika: "9331450",
      howToGet:
        "От метро Войковская: последний вагон из центра, выход из стеклянных дверей налево, в город — направо (выход №7). 80–100 метров вдоль дома, на углу сквера налево до трамвайных путей. Ориентир — вывеска Сбербанка, 2-й подъезд.",
      receptionNote: "Приём главным врачом: вторник и четверг, 16:00–18:00",
    },
  });

  const idByPath = new Map<string, string>();
  for (const item of tree) {
    const created = await prisma.service.create({
      data: {
        slug: item.slug,
        path: item.path,
        title: item.title,
        description:
          descriptions.get(item.path) ??
          descriptions.get(item.title.toLowerCase()) ??
          `${item.title} в клинике «Один к Одному» на Войковской. Запишитесь на консультацию — составим понятный план лечения.`,
        seoTitle: `${item.title} — клиника «Один к Одному»`,
        seoDescription: `Услуга «${item.title}» в стоматологии «Один к Одному» у метро Войковская.`,
        parentId: item.parentPath ? idByPath.get(item.parentPath) : null,
        topSlug: item.topSlug,
        sortOrder: item.sortOrder,
      },
    });
    idByPath.set(item.path, created.id);
  }

  const categoryHints: Record<string, string[]> = {
    Анестезия: ["lechenie_zubov_bez_boli"],
    Диагностика: ["diagnostika"],
    "Терапевтическая Пародонтология": ["parodontologija", "professionalnaya_chistka_zubov"],
    Терапия: ["terapevticheskaja_stomatologija"],
    Хирургия: ["hirurgicheskaja_stomatologija"],
    Имплантология: ["implantaciya_zubov"],
    "Реконструктивная Хирургия": ["implantaciya_zubov", "hirurgicheskaja_stomatologija"],
  };

  for (const price of prices) {
    const hints = categoryHints[price.categoryName] ?? [];
    let serviceId: string | null = null;
    for (const hint of hints) {
      const found = tree.find((item) => item.path === hint);
      if (found) {
        serviceId = idByPath.get(found.path) ?? null;
        break;
      }
    }
    await prisma.priceItem.create({
      data: {
        title: price.title,
        price: price.price,
        categoryName: price.categoryName,
        code: price.code,
        serviceId,
        sortOrder: price.sortOrder,
      },
    });
  }

  if (doctors.length) {
    await prisma.doctor.createMany({ data: doctors });
  }
  if (reviews.length) {
    await prisma.review.createMany({ data: reviews });
  }
  if (gallery.length) {
    await prisma.galleryImage.createMany({ data: gallery });
  }

  await prisma.page.createMany({
    data: [
      {
        slug: "about",
        title: "О клинике",
        excerpt: "Стоматология «Один к Одному» у метро Войковская.",
        body: ABOUT_BODY,
      },
      {
        slug: "privacy",
        title: "Политика обработки персональных данных",
        excerpt: "Как ООО «Ноли Ноцэрэ+» обрабатывает данные пациентов.",
        body: PRIVACY_BODY,
      },
      {
        slug: "legal",
        title: "Официальная информация",
        excerpt: "Лицензия, реквизиты и режим приёма.",
        body: LEGAL_BODY,
      },
    ],
  });

  await prisma.faq.createMany({
    data: FAQS.map((item, index) => ({ ...item, sortOrder: index })),
  });

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: { passwordHash, name: adminName },
    create: {
      email: adminEmail.toLowerCase(),
      passwordHash,
      name: adminName,
    },
  });

  console.log(
    JSON.stringify(
      {
        services: tree.length,
        prices: prices.length,
        doctors: doctors.length,
        reviews: reviews.length,
        gallery: gallery.length,
        faqs: FAQS.length,
        admin: adminEmail,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
