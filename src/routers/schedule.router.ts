import { Router } from "express";
import {
  readScheduleRealEstateController,
  scheduleCreateController,
} from "../controllers/schedule.controller";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { scheduleCreateSchema } from "../schemas/schedule.schema";
import { verifyPermitionMiddleware } from "../middlewares/verifyPermition.middleware";

const scheduleRouter: Router = Router();

scheduleRouter.post(
  "",
  validateTokenMiddleware,
  validateBodyMiddleware(scheduleCreateSchema),
  scheduleCreateController
);
scheduleRouter.get(
  "/realEstate/:id",
  validateTokenMiddleware,
  verifyPermitionMiddleware,
  readScheduleRealEstateController
);

export { scheduleRouter };
