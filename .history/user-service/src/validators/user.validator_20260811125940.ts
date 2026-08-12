import { z } from "zod";


const User = z.object({
    name:z.string().min(3),
    email:z.string().min(20),
    password:z.string().min(8).max(20),
})