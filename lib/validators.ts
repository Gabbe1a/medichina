import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(6, "Укажите телефон").max(32),
  email: z.string().trim().email("Некорректный email").or(z.literal("")).optional(),
  message: z.string().trim().max(2000).optional(),
  source: z.string().trim().max(60).optional(),
  consent: z.literal("on", {
    errorMap: () => ({ message: "Нужно согласие на обработку персональных данных" }),
  }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
