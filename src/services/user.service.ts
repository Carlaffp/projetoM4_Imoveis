import { User } from "../entities";
import {
  UserCreate,
  UserRead,
  UserReturn,
  UserUpdate,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories";
import { userReadSchema, userReturnSchema } from "../schemas/user.schema";

const userCreateService = async (payload: UserCreate): Promise<UserReturn> => {
  const user: User = userRepository.create(payload);
  await userRepository.save(user);

  return userReturnSchema.parse(user);
};

const userReadService = async (): Promise<UserRead> => {
  return userReadSchema.parse(await userRepository.find());
};

const userUpdateService = async (
  userId: number,
  payload: UserUpdate
): Promise<UserReturn> => {
  const userUpdate = await userRepository.findOneBy({
    id: userId,
  });

  const newUser: User = userRepository.create({
    ...userUpdate,
    ...payload,
  });
  await userRepository.save(newUser);
  return userReturnSchema.parse(newUser);
};

const userDeleteService = async (user: User): Promise<void> => {
  await userRepository.softRemove(user);
};

export {
  userCreateService,
  userReadService,
  userUpdateService,
  userDeleteService,
};
