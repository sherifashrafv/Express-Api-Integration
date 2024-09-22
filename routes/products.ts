import { Router } from "express";
import { generateFakeProducts } from "../utils/fakeData";
import ProductService from "../services/productServices";
import ProductController from "../controllers/productController";

const ProductsRouter = Router();

const fakeProductsData = generateFakeProducts();
const productService = new ProductService(fakeProductsData);
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = new ProductController(productService);

ProductsRouter.route("/").get(getProducts).post(createProduct);
ProductsRouter.route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

export default ProductsRouter;
