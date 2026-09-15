import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-navy">Страница не найдена</h1>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">
          На главную
        </Link>
      </div>
    </div>
  );
}
