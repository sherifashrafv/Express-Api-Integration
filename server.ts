import express, { Request, Response } from "express";
import { Product } from "./interfaces";
import { generateFakeProducts } from "./utils/fakeData";
import ProductService from "./services/productServices";
import ProductController from "./controllers/productController";
import path from "path";

const app = express();

app.use(express.json());
// ** SET VIEWS DIRECTORY **
app.set("view engine", "pug");
// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

const fakeProductsData = generateFakeProducts();
const productService = new ProductService(fakeProductsData);
const productController = new ProductController(productService);

// ** VIEWS
app.get("/products", (req, res) => {
  productController.renderProductList(req, res);
});
app.get("/", (req, res) => {
  res.render("index");
});
app.get("*", (req, res) => {
  res.render("notFound");
});
// ** API ENDPOINTS **
app.get("/api/products", (req, res) => productController.getProducts(req, res));
app.get("/api/products/:id", (req, res) =>
  productController.getProductById(req, res)
);
app.post("/api/products", (req, res) =>
  productController.createProduct(req, res)
);
app.patch("/api/products/:id", (req, res) =>
  productController.updateProduct(req, res)
);
app.delete("/api/products/:id", (req, res) =>
  productController.deleteProduct(req, res)
);

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
