import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

type LoginCreate = z.infer<typeof loginSchema>;
type LoginReturn = { token: string };

export { LoginCreate, LoginReturn };
