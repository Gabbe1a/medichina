import Link from "next/link";

export function CircularCta({ href = "/contacts#zapis" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group relative grid size-[148px] place-items-center rounded-full bg-lime text-navy shadow-[0_16px_40px_rgba(0,47,108,0.12)]"
      aria-label="Записаться на консультацию"
    >
      <svg viewBox="0 0 148 148" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="cta-circle" d="M74,74 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
        </defs>
        <text fill="#002f6c" fontSize="10" fontWeight="800" letterSpacing="2.2">
          <textPath href="#cta-circle">ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ · </textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-white text-2xl transition group-hover:-translate-y-0.5">
        ↑
      </span>
    </Link>
  );
}
