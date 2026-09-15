"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    setLoading(false);
    if (!response.ok) {
      setError(payload.error ?? "Ошибка входа");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#071324] px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-[32px] bg-white p-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent">CMS</p>
        <h1 className="mt-2 text-3xl font-semibold text-navy">Вход в админку</h1>
        <p className="mt-2 text-sm text-muted">Клиника «Один к Одному»</p>
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="mt-6 w-full rounded-2xl border border-[var(--line)] px-4 py-3 text-sm"
        />
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Пароль"
          className="mt-3 w-full rounded-2xl border border-[var(--line)] px-4 py-3 text-sm"
        />
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-full bg-navy py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "Проверяем…" : "Войти"}
        </button>
      </form>
    </div>
  );
}
