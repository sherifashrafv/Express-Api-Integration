import { ProductServce } from "../services/productServices";

class ProductController {
  // Define productService as a class property
  private productService: ProductServce;

  // Assign productService in the constructor
  constructor(productService: ProductServce) {
    this.productService = productService; // Assign the passed instance to the class property
  }

  // Methods
  getProducts() {
    return this.productService.findAll();
  }
}

export default ProductController;
