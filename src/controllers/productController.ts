import { Product } from "../../interfaces";

class ProductController {
  // PRPOPERTIES
  products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }
  //  ** Methods
  getProducts() {
    return this.products;
  }
}

export default ProductController;
