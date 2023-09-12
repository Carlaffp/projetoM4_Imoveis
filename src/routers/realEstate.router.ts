import { Router } from "express";
import {
  readRealEstateController,
  realEstateCreateController,
} from "../controllers/realEstate.controller";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware";
import { verifyPermitionMiddleware } from "../middlewares/verifyPermition.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { realEstateCreateSchema } from "../schemas/realEstate.schema";

const realEstateRouter: Router = Router();

realEstateRouter.post(
  "",
  validateTokenMiddleware,
  verifyPermitionMiddleware,
  validateBodyMiddleware(realEstateCreateSchema),
  realEstateCreateController
);
realEstateRouter.get("", readRealEstateController);

export { realEstateRouter };
