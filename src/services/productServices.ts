import { Product } from "../../interfaces";
import { generateFakeProducts } from "../utils/fakeData";

const FakeProductData = generateFakeProducts();
export class ProductServce {
  private readonly products: Product[] = FakeProductData;
  // findAll
  findAll() {
    return this.products;
  }
}
