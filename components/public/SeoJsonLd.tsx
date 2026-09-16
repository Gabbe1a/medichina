import type { Setting } from "@prisma/client";
import { SITE_NAME, absoluteUrl, publicSiteUrl } from "@/lib/site";

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BREADCRUMB_LABELS: Record<string, string> = {
  about: "О клинике",
  services: "Услуги",
  doctors: "Врачи",
  prices: "Цены",
  reviews: "Отзывы",
  contacts: "Контакты",
  privacy: "Политика ПДн",
  legal: "Официальная информация",
  akcii: "Акции",
  patients: "Пациентам",
  faq: "Вопросы",
};

function crumbsFor(path: string) {
  const parts = path.split("/").filter(Boolean);
  const items = [{ name: "Главная", item: publicSiteUrl() }];
  let acc = "";
  for (const part of parts) {
    acc += `/${part}`;
    items.push({ name: BREADCRUMB_LABELS[part] ?? decodeURIComponent(part).replaceAll("_", " "), item: absoluteUrl(acc) });
  }
  return items;
}

export function SeoJsonLd({
  path,
  settings,
  faqs,
}: {
  path: string;
  settings: Setting;
  faqs: { question: string; answer: string }[];
}) {
  const origin = publicSiteUrl();
  const dentist = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${origin}/#clinic`,
    name: SITE_NAME,
    legalName: settings.legalEntity,
    url: origin,
    telephone: settings.phone1,
    email: settings.email,
    image: absoluteUrl("/images/hero-clean.webp"),
    logo: absoluteUrl("/media/logos/logo.svg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.lat,
      longitude: settings.lon,
    },
    openingHours: "Mo-Su 09:00-21:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: settings.rating,
      reviewCount: settings.reviewsCount,
      ratingCount: settings.ratingsCount,
      bestRating: 5,
    },
    hasMap: `https://yandex.ru/maps/org/${settings.yandexOrgId}/`,
    sameAs: [`https://yandex.ru/maps/org/${settings.yandexOrgId}/`, settings.whatsapp].filter(Boolean),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: origin,
    publisher: { "@id": `${origin}/#clinic` },
    inLanguage: "ru-RU",
  };

  const graphs: JsonLdValue[] = [dentist, website];

  if (path !== "/") {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbsFor(path).map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    });
  }

  if (path === "/" && faqs.length) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.slice(0, 8).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <>
      {graphs.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
    </>
  );
}
