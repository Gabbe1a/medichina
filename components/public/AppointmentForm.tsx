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
        className="rounded-xl border border-[#d8cfc2] bg-white px-4 py-3 text-sm text-navy outline-none placeholder:text-muted/60 focus:border-chocolate focus:ring-1 focus:ring-chocolate/20"
      />
      <input
        name="phone"
        required
        placeholder="Телефон"
        className="rounded-xl border border-[#d8cfc2] bg-white px-4 py-3 text-sm text-navy outline-none placeholder:text-muted/60 focus:border-chocolate focus:ring-1 focus:ring-chocolate/20"
      />
      <input
        name="email"
        type="email"
        placeholder="Email (необязательно)"
        className="rounded-xl border border-[#d8cfc2] bg-white px-4 py-3 text-sm text-navy outline-none placeholder:text-muted/60 focus:border-chocolate focus:ring-1 focus:ring-chocolate/20"
      />
      {!compact ? (
        <textarea
          name="message"
          rows={4}
          placeholder="Коротко о запросе"
          className="rounded-xl border border-[#d8cfc2] bg-white px-4 py-3 text-sm text-navy outline-none placeholder:text-muted/60 focus:border-chocolate focus:ring-1 focus:ring-chocolate/20"
        />
      ) : null}
      <label className="flex items-start gap-2 text-xs leading-5 text-muted">
        <input name="consent" type="checkbox" required className="mt-1 accent-chocolate" />
        <span>
          Соглашаюсь с{" "}
          <a href="/privacy" className="font-semibold text-chocolate underline">
            политикой обработки персональных данных
          </a>
        </span>
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-chocolate px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-chocolate-light disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? "Отправляем…" : "Записаться на консультацию"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "ok" ? "text-emerald-700" : "text-red-600"}`}>{message}</p>
      ) : null}
    </form>
  );
}
