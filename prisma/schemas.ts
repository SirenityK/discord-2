import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password must be at most 20 characters long" })
  .refine((v) => /[A-Z]/.test(v), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((v) => /[0-9]/.test(v), {
    message: "Password must contain at least one number",
  })
  .refine((v) => /[^a-zA-Z0-9]/.test(v), {
    message: "Password must contain at least one special character",
  });

export const imageExtension = z
  .string()
  .refine((v) => new RegExp("png|jpg|jpeg").test(v));
