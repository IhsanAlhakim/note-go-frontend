import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email field cannot be empty" })
      .email({ message: "Email is not valid" }),
    username: z
      .string({ required_error: "Username field cannot be empty" })
      .min(8, {
        message: "Username is too short. Minimum 8 characters required",
      }),
    password: z
      .string({ required_error: "Password field cannot be empty" })
      .min(8, {
        message: "Password is too short. Minimum 8 characters required",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });
