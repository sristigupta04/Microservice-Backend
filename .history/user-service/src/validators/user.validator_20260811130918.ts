import { z } from "zod";

const User = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password:  password: z
    .string()
    .min(8)
    .max(16)
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
});

const result = User.safeParse({
  name: "sachi",
  email: "yak@124gmail.com",
  password: "12345678",
});

if (!result.success) {
  console.log(result.error.format());
} else {
  console.log("Validation successful", result.data);
}