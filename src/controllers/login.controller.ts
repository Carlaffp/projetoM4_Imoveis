import { Request, Response } from "express";

import { createLoginService } from "../services/login.service";
import { LoginReturn } from "../interfaces/login.interface";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: LoginReturn = await createLoginService(req.body);
  return res.status(200).json(token);
};

export { createLoginController };
