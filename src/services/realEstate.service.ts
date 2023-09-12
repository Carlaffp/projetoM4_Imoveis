import { Address, Category, RealEstate } from "../entities";
import AppError from "../error";
import { AddressCreate } from "../interfaces/address.interface";
import {
  RealEstateCreate,
  RealEstateRead,
} from "../interfaces/realEstate.interface";
import {
  RealEstateRepository,
  addressRepository,
  categoryRepository,
} from "../repositories";

const realEstateCreateService = async (
  payload: RealEstateCreate
): Promise<RealEstate> => {
  const { categoryId, address, ...payloadResto } = payload;
  const addressData: AddressCreate = payload.address;
  const foundAddress: Address | null = await addressRepository.findOne({
    where: {
      number: addressData.number,
      street: addressData.street,
      zipCode: addressData.zipCode,
      city: addressData.city,
      state: addressData.state,
    },
  });
  if (foundAddress) {
    throw new AppError("Address already exists", 409);
  }
  const createAddress: Address = addressRepository.create(addressData);
  await addressRepository.save(createAddress);

  const category: Category | null = await categoryRepository.findOneBy({
    id: payload.categoryId,
  });
  if (!category) {
    throw new AppError("Category not found", 409);
  }

  const realEstate: RealEstate = RealEstateRepository.create({
    ...payloadResto,
    address: createAddress,
    category: category,
  });

  return await RealEstateRepository.save(realEstate);
};

const readRealEstateService = async (): Promise<RealEstateRead> => {
  const realEstate: Array<RealEstate> = await RealEstateRepository.find({
    relations: {
      address: true,
    },
  });
  return realEstate;
};

export { realEstateCreateService, readRealEstateService };
