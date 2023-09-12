import { z } from "zod";
import {
  realEstateCreateSchema,
  realEstateReadSchema,
} from "../schemas/realEstate.schema";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";

type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;
type RealEstateRead = z.infer<typeof realEstateReadSchema>;

type RealEstateRepository = Repository<RealEstate>;

export { RealEstateCreate, RealEstateRead, RealEstateRepository };
