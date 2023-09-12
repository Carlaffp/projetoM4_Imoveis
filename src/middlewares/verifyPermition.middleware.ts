import { NextFunction, Request, Response } from "express";
import AppError from "../error";

const verifyPermitionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;
  const { sub, admin } = res.locals.decoded;

  if (admin) return next();

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export { verifyPermitionMiddleware };
