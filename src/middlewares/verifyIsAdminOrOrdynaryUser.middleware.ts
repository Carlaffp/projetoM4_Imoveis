import { NextFunction, Request, Response } from "express";
import AppError from "../error";

const verifyIsAdminOrOrdinaryUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin, sub } = res.locals.decoded;

  const idParams = req.params.id;

  if (!admin && Number(sub) !== Number(idParams)) {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};

export { verifyIsAdminOrOrdinaryUserMiddleware };
