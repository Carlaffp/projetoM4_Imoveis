import { Request, Response } from "express";
import { Category } from "../entities";
import {
  categoryCreateService,
  readCategoriesService,
  readCategoryWithRealEstateService,
} from "../services/category.service";

const categoryCreateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category: Category = await categoryCreateService(req.body);
  return res.status(201).json(category);
};

const readCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await readCategoriesService();

  return res.status(200).json(categories);
};

const readCategoryWithRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const categoryWithRealEstate = await readCategoryWithRealEstateService(id);
  return res.status(200).json(categoryWithRealEstate);
};

export {
  categoryCreateController,
  readCategoriesController,
  readCategoryWithRealEstateController,
};
