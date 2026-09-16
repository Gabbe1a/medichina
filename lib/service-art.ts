export function serviceArtwork(category: string) {
  if (category.includes("implant")) return "/images/services/implant.webp";
  if (category.includes("otbel")) return "/images/services/whitening.webp";
  if (category.includes("ortodont")) return "/images/services/ortho.webp";
  if (category.includes("hirurg")) return "/images/services/surgery.webp";
  return "/images/services/aesthetic.webp";
}
