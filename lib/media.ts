export function toWebpUrl(url: string) {
  if (!url) return url;
  const [path, query] = url.split("?");
  const converted = path.replace(/\.(jpe?g|png|gif|bmp|tiff)$/i, ".webp");
  return query ? `${converted}?${query}` : converted;
}
