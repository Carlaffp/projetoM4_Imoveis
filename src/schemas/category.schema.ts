import { z } from "zod";
import { realEstateResponse } from "./realEstate.schema";

const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(45),
});

const categoryCreateSchema = categorySchema.omit({
  id: true,
});

const categoryReadSchema = categorySchema.array();

const categoryWithRealEstate = categorySchema.omit({ id: true }).extend({
  realEstate: realEstateResponse.array(),
});
export {
  categorySchema,
  categoryCreateSchema,
  categoryReadSchema,
  categoryWithRealEstate,
};
