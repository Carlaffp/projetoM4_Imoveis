import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { Address, Category, RealEstate, Schedule, User } from "./entities";

const userRepository: Repository<User> = AppDataSource.getRepository(User);
const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
const addressRepository :Repository<Address> = AppDataSource.getRepository(Address)
const RealEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

export { userRepository,scheduleRepository, addressRepository, RealEstateRepository, categoryRepository };