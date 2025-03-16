import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(18)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/,
    ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(18),
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
  groupName: z.string().min(1).max(20),
  groupDescription: z.string().min(1),
  members: z.array(z.string()),
});

export const updateGroupSchema = z.object({
  groupId: z.string().min(1),
  groupName: z.string().min(1).max(20).optional(),
  groupDescription: z.string().min(1).optional(),
  members: z.array(z.string()),
});

export const createTxnSchema = z.object({
  txnName: z.string().min(1),
  description: z.string().optional(),
  groupId: z.string().min(1),
  paidById: z.string().min(1),
  participants: z.array(z.string()),
  amount: z.number(),
  currency: z.string().min(3).max(3).optional(),
  shares: z.record(z.string(), z.number()).optional(),
});

export const updateTxnSchema = z.object({
  txnId: z.number().int(),
  txnName: z.string().min(1).optional(),
  description: z.string().optional(),
  groupId: z.string().min(1),
  paidById: z.string().min(1).optional(),
  participants: z.array(z.string()).optional(),
  amount: z.number().positive().optional(),
  currency: z.string().min(3).max(3).optional(),
  status: z.enum(["PENDING", "COMPLETED"]).default("PENDING"),
});
