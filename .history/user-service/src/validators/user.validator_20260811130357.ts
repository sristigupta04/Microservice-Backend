import { z } from "zod";

const User = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8).max(20),
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