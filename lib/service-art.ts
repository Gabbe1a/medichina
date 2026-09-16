export function serviceArtwork(category: string) {
  const key = category.toLowerCase();
  if (key.includes("implant") || key.includes("protez")) return "/images/services/implant.webp";
  if (key.includes("otbel") || key.includes("chistka") || key.includes("gigien")) return "/images/services/whitening.webp";
  if (key.includes("ortodont")) return "/images/services/ortho.webp";
  if (key.includes("hirurg") || key.includes("parodont") || key.includes("boli") || key.includes("narkoz")) {
    return "/images/services/surgery.webp";
  }
  return "/images/services/aesthetic.webp";
}
