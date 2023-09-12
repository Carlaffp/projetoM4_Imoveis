import { z } from "zod";
import { addressCreateSchema, addressSchema } from "./address.schema";

const realEstateSchema = z.object({
  id: z.number().int().positive(),
  sold: z.boolean().default(false),
  value: z.number().positive().default(0).or(z.string()),
  size: z.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  addressId: z.number(),
  categoryId: z.number(),
});

const realEstateCreateSchema = realEstateSchema
  .omit({
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
    addressId: true,
  })
  .extend({
    address: addressCreateSchema,
  });

const realEstateResponse = realEstateSchema
  .omit({ addressId: true, categoryId: true })
  .extend({ address: addressSchema });
const realEstateReadSchema = realEstateResponse.omit({ id: true }).array();

export {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateResponse,
  realEstateReadSchema,
};
