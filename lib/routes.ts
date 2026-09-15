export function serviceHref(service: {
  topSlug: string;
  path: string;
  parentId: string | null;
}) {
  if (!service.parentId) return `/services/${service.topSlug}`;
  const last = service.path.split("/").pop();
  return `/services/${service.topSlug}/${last}`;
}

export function doctorHref(slug: string) {
  return `/doctors/${slug}`;
}
