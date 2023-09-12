import { Request, Response } from "express";
import { scheduleRepository } from "../repositories";
import { ScheduleCreate } from "../interfaces/schedule.interface";
import {
  readScheduleRealEstateService,
  scheduleCreateService,
} from "../services/schedule.service";
import { RealEstate } from "../entities";

const scheduleCreateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const scheduleBody: ScheduleCreate = req.body;
  const { sub } = res.locals.decoded;
  const schedule = await scheduleCreateService(scheduleBody, sub);
  return res.status(201).json({ message: "Schedule created" });
};

const readScheduleRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstateId: number = Number(request.params.id);
  const listSchedules: RealEstate = await readScheduleRealEstateService(
    realEstateId
  );

  return response.json(listSchedules);
};

export { scheduleCreateController, readScheduleRealEstateController };
