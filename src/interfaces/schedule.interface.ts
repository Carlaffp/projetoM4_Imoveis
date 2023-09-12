import { z } from "zod";
import {
  scheduleCreateSchema,
  scheduleSchema,
} from "../schemas/schedule.schema";

type ScheduleCreate = z.infer<typeof scheduleCreateSchema>;
type ScheduleResponse = z.infer<typeof scheduleSchema>;

export { ScheduleCreate, ScheduleResponse };
