import { RealEstate, Schedule, User } from "../entities";
import AppError from "../error";
import { ScheduleCreate } from "../interfaces/schedule.interface";
import {
  RealEstateRepository,
  scheduleRepository,
  userRepository,
} from "../repositories";

const scheduleCreateService = async (
  scheduleBody: ScheduleCreate,
  userId: number
): Promise<Schedule> => {
  const user: User | null = await userRepository.findOneBy({
    id: userId,
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const realEstate: RealEstate | null = await RealEstateRepository.findOneBy({
    id: scheduleBody.realEstateId,
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }
  const day = new Date(scheduleBody.date).getDay();
  if (day === 0 || day === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const hour = scheduleBody.hour.split(":");
  const hourInt = parseInt(hour[0], 10);
  if (hourInt < 8 || hourInt > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const verifyRealEstateSchedule: Schedule | null =
    await scheduleRepository.findOne({
      where: {
        realEstate: {
          id: scheduleBody.realEstateId,
        },
        date: scheduleBody.date,
        hour: scheduleBody.hour,
      },
    });
  if (verifyRealEstateSchedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const verifyUserSchedule: Schedule | null = await scheduleRepository.findOne({
    where: {
      user: {
        id: userId,
      },
      date: scheduleBody.date,
      hour: scheduleBody.hour,
    },
  });
  if (verifyUserSchedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }
  const newSchedule = scheduleRepository.create({
    date: scheduleBody.date,
    hour: scheduleBody.hour,
    user,
    realEstate,
  });

  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

const readScheduleRealEstateService = async (
  realEstateId: number
): Promise<RealEstate> => {
  const realEstate: RealEstate | null = await RealEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      schedules: {
        user: true,
      },
      category: true,
      address: true,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }
  return realEstate;
};

export { scheduleCreateService, readScheduleRealEstateService };
