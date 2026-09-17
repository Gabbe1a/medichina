import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { requireAdmin } from "@/lib/session";

const RASTER = /\.(jpe?g|png|gif|bmp|tiff|webp)$/i;

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Нет доступа" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не выбран" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.byteLength > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Файл больше 8 МБ" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^\w.\-а-яА-ЯёЁ]+/g, "_");
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });

  if (RASTER.test(safeName) || file.type.startsWith("image/")) {
    const base = safeName.replace(/\.[^.]+$/, "") || "image";
    const filename = `${Date.now()}-${base}.webp`;
    const webp = await sharp(bytes).rotate().webp({ quality: 82 }).toBuffer();
    await writeFile(path.join(dir, filename), webp);
    return NextResponse.json({ url: `/uploads/${filename}` });
  }

  const filename = `${Date.now()}-${safeName}`;
  await writeFile(path.join(dir, filename), bytes);
  return NextResponse.json({ url: `/uploads/${filename}` });
}
