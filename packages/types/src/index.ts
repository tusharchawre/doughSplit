import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8).max(18)
})


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(18).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/)
})

export const updateSchema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8).max(18).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    imageUrl : z.string().min(1)
})
