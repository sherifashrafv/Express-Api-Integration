import { faker } from "@faker-js/faker";
import { Product } from "../interfaces/index";

export const generateFakeProducts = (): Product[] => {
  return Array.from({ length: 25 }, (_, index) => {
    return {
      id: index + 1,
      title: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 100, max: 200 })),
      description: faker.commerce.productDescription(),
    };
  });
};
