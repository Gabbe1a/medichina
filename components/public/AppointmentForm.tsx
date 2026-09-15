"use client";

import { useState } from "react";

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = new FormData(form);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        phone: data.get("phone"),
        email: data.get("email") || "",
        message: data.get("message") || "",
        source: data.get("source") || "consultation",
        consent: data.get("consent") ? "on" : "",
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (response.ok) {
      setStatus("ok");
      setMessage("Заявка отправлена. Мы перезвоним и подберём удобное время.");
      form.reset();
      return;
    }

    setStatus("error");
    setMessage(payload.error ?? "Не удалось отправить заявку. Позвоните нам, пожалуйста.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" id={compact ? undefined : "zapis"}>
      <input type="hidden" name="source" value={compact ? "modal" : "page"} />
      <input
        name="name"
        required
        placeholder="Имя"
        className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-accent"
      />
      <input
        name="phone"
        required
        placeholder="Телефон"
        className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-accent"
      />
      <input
        name="email"
        type="email"
        placeholder="Email (необязательно)"
        className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-accent"
      />
      {!compact ? (
        <textarea
          name="message"
          rows={4}
          placeholder="Коротко о запросе"
          className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-accent"
        />
      ) : null}
      <label className="flex items-start gap-2 text-xs leading-5 text-muted">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>
          Соглашаюсь с{" "}
          <a href="/privacy" className="font-semibold text-accent">
            политикой обработки персональных данных
          </a>
        </span>
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-navy px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Отправляем…" : "Записаться на консультацию"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "ok" ? "text-emerald-700" : "text-red-600"}`}>{message}</p>
      ) : null}
    </form>
  );
}
