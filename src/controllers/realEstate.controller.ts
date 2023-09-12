import { Request, Response } from "express";
import {
  readRealEstateService,
  realEstateCreateService,
} from "../services/realEstate.service";

const realEstateCreateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;
  const realEstate = await realEstateCreateService(body);

  return res.status(201).json(realEstate);
};

const readRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate = await readRealEstateService();
  return res.status(200).json(realEstate);
};

export { realEstateCreateController, readRealEstateController };
