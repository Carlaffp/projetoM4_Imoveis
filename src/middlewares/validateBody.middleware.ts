import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validateBodyMiddleware =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
  };

export { validateBodyMiddleware };
