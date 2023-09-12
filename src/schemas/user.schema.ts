import { z } from "zod";

const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});
const userUpdateSchema = userCreateSchema.partial().omit({
  admin: true,
});

const userReturnSchema = userSchema.omit({ password: true });
const userReadSchema = userReturnSchema.array();

export {
  userSchema,
  userCreateSchema,
  userReadSchema,
  userUpdateSchema,
  userReturnSchema,
};
