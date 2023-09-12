import { compare } from "bcryptjs";
import AppError from "../error";
import { LoginCreate, LoginReturn } from "../interfaces/login.interface";
import { userRepository } from "../repositories";
import { UserRequest } from "../interfaces/user.interface";
import { sign } from "jsonwebtoken";
import { User } from "../entities";

const createLoginService = async (
  payload: LoginCreate
): Promise<LoginReturn> => {
  const userLogin: User | null = await userRepository.findOneBy({
    email: payload.email,
  });

  if (!userLogin) {
    throw new AppError("Invalid credentials", 401);
  }

  const matchPassword: boolean = await compare(
    payload.password,
    userLogin.password
  );

  if (!matchPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    { email: userLogin.email, admin: userLogin.admin },
    process.env.SECRET_KEY!,
    { subject: userLogin.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );
  return { token };
};

export { createLoginService };
