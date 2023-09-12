import { Request, Response } from "express";
import {
  UserCreate,
  UserRead,
  UserRequest,
  UserReturn,
  UserUpdate,
} from "../interfaces/user.interface";
import {
  userCreateService,
  userDeleteService,
  userReadService,
  userUpdateService,
} from "../services/user.service";
import { User } from "../entities";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const create: UserReturn = await userCreateService(req.body);

  return res.status(201).json(create);
};

const readUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await userReadService();

  return res.status(200).json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.id);
  const body: User = req.body;
  const user = await userUpdateService(userId, body);
  return res.status(200).json(user);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await userDeleteService(res.locals.foundEntity);
  return res.status(204).json();
};

export {
  createUserController,
  readUserController,
  updateUserController,
  deleteUserController,
};
