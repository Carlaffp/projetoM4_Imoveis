import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userSchema,
} from "../schemas/user.schema";

type UserRequest = z.infer<typeof userSchema>;
type UserCreate = z.infer<typeof userCreateSchema>;
type UserUpdate = DeepPartial<User>;
type UserRead = z.infer<typeof userReadSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;

type userRepository = Repository<User>;

export {
  UserRequest,
  UserCreate,
  UserRead,
  UserUpdate,
  UserReturn,
  userRepository,
};
