import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";
import AppError from "../error";

const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.body.email) return next();

  const foundUserEmail: User | null = await userRepository.findOneBy({
    email: req.body.email,
  });
  if (foundUserEmail) {
    throw new AppError("Email already exists", 409);
  }
  return next();
};

export { verifyEmailExists };
