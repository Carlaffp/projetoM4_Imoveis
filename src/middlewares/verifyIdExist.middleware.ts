import { NextFunction, Request, Response } from "express";
import AppError from "../error";
import { User } from "../entities";
import { userRepository } from "../repositories";

const verifyIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const foundEntity: User | null = await userRepository.findOneBy({
    id: Number(req.params.id),
  });
  if (!foundEntity) {
    throw new AppError("User not found", 404);
  }

  res.locals = { ...res.locals, foundEntity };

  return next();
};

export { verifyIdExists };
