import { z } from "zod";
import { realEstateSchema } from "./realEstate.schema";
import { userSchema } from "./user.schema";

const scheduleSchema = z.object({
  id: z.number().int().positive(),
  date: z.string(),
  hour: z.string(),
  realEstate: realEstateSchema,
  user: userSchema,
});

const scheduleCreateSchema = scheduleSchema
  .omit({
    id: true,
    user: true,
    realEstate: true,
  })
  .extend({
    realEstateId: z.number(),
  });

const scheduleReadSchema = scheduleSchema.array();

export { scheduleSchema, scheduleCreateSchema, scheduleReadSchema };
