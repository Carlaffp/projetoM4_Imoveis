import { Category } from "../entities";
import AppError from "../error";
import {
  CategoryCreate,
  CategoryRead,
  CategoryWithRealEstate,
} from "../interfaces/category.interface";
import { categoryRepository } from "../repositories";
import { categoryReadSchema } from "../schemas/category.schema";

const categoryCreateService = async (
  payload: CategoryCreate
): Promise<Category> => {
  const category: Category = categoryRepository.create(payload);
  await categoryRepository.save(category);
  return category;
};

const readCategoriesService = async (): Promise<CategoryRead> => {
  return await categoryRepository.find();
};

const readCategoryWithRealEstateService = async (
  categoryId: number
): Promise<CategoryWithRealEstate> => {
  const categoryWithRealEstate = await categoryRepository.findOne({
    where: { id: categoryId },
    relations: { realEstate: true },
  });
  if (!categoryWithRealEstate) {
    throw new AppError("Category not found", 404);
  }
  return categoryWithRealEstate;
};

export {
  categoryCreateService,
  readCategoriesService,
  readCategoryWithRealEstateService,
};
