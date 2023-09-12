import { z } from "zod";
import { addressCreateSchema } from "../schemas/address.schema";
import { Repository } from "typeorm";
import { Address } from "../entities";

type AddressCreate = z.infer<typeof addressCreateSchema>;

type addressRepository = Repository<Address>;

export { AddressCreate, addressRepository };
