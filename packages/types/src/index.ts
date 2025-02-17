import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).max(18).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/,
  ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(18)
    
});

export const updateSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(18)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/,
    ),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  imageUrl: z.string().min(1),
});


export const createGroupSchema = z.object({
  groupName:  z.string().min(1).max(20),
  groupDescription:  z.string().min(1),
  members: z.string().array()
})

export const updateGroupSchema = z.object({
  groupId:  z.string().min(1),
  groupName:  z.string().min(1).max(20).optional(),
  groupDescription:  z.string().min(1).optional(),
  members: z.string().array()
})