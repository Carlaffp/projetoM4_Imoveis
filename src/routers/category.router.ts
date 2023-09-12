import { Router } from "express";
import {
  categoryCreateController,
  readCategoriesController,
  readCategoryWithRealEstateController,
} from "../controllers/category.controller";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware";
import { verifyPermitionMiddleware } from "../middlewares/verifyPermition.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schema";
import { verifyCategoryExistMiddleware } from "../middlewares/verifyCategoryExist.middleware";

const categoryRouter: Router = Router();

categoryRouter.post(
  "",
  validateTokenMiddleware,
  verifyPermitionMiddleware,
  validateBodyMiddleware(categoryCreateSchema),
  verifyCategoryExistMiddleware,
  categoryCreateController
);
categoryRouter.get("", readCategoriesController);
categoryRouter.get("/:id/realEstate", readCategoryWithRealEstateController);

export { categoryRouter };
