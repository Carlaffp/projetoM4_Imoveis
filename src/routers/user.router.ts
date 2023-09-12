import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { verifyEmailExists } from "../middlewares/verifyEmailExist.middleware";
import {
  createUserController,
  deleteUserController,
  readUserController,
  updateUserController,
} from "../controllers/user.controller";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";
import { verifyIdExists } from "../middlewares/verifyIdExist.middleware";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware";
import { verifyPermitionMiddleware } from "../middlewares/verifyPermition.middleware";
import { verifyIsAdminOrOrdinaryUserMiddleware } from "../middlewares/verifyIsAdminOrOrdynaryUser.middleware";
const usersRouter: Router = Router();

usersRouter.post(
  "",
  validateBodyMiddleware(userCreateSchema),
  verifyEmailExists,
  createUserController
);
usersRouter.get(
  "",
  validateTokenMiddleware,
  verifyPermitionMiddleware,
  readUserController
);

usersRouter.patch(
  "/:id",
  verifyIdExists,
  validateTokenMiddleware,
  verifyIsAdminOrOrdinaryUserMiddleware,
  validateBodyMiddleware(userUpdateSchema),
  verifyEmailExists,
  updateUserController
);
usersRouter.delete(
  "/:id",
  verifyIdExists,
  validateTokenMiddleware,
  verifyPermitionMiddleware,
  deleteUserController
);

export { usersRouter };
