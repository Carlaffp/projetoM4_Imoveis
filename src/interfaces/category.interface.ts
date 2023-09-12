import { z } from "zod";
import {
  categoryCreateSchema,
  categoryReadSchema,
  categoryWithRealEstate,
} from "../schemas/category.schema";
import { Category } from "../entities";
import { Repository } from "typeorm";

type CategoryCreate = z.infer<typeof categoryCreateSchema>;
type CategoryRead = z.infer<typeof categoryReadSchema>;
type CategoryWithRealEstate = z.infer<typeof categoryWithRealEstate>;

type categoryRepository = Repository<Category>;

export {
  CategoryCreate,
  CategoryRead,
  categoryRepository,
  CategoryWithRealEstate,
};
