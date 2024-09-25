import express from "express";
import { generateFakeProducts } from "./utils/fakeData";
import ProductService from "./services/productServices";
import ProductController from "./controllers/productController";
import path from "path";
import ProductsRouter from "./routes/products";
import ProductsViewController from "./controllers/productViewController";

const app = express();

app.use(express.json());
// ** SET VIEWS DIRECTORY **ٍٍٍٍ
app.set("view engine", "pug");
// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

const fakeProductsData = generateFakeProducts();
const productService = new ProductService(fakeProductsData);
const productController = new ProductController(productService);
const ProductViewsController = new ProductsViewController(productService);

// ** WE CAN MAKE THIS LITTLE BIT CLEANED (FOR API) **
app.use("/api/products", ProductsRouter);

// ** WE CAN MAKE THIS LITTLE BIT CLEANED (FOR VIEWS) **
app.use("/products", ProductViewsController.renderProductsList);
app.use("/products/:id", ProductViewsController.renderProductPage);

// ** VIEWS (ROUTES)
// app.get("/products", (req, res) => {
//   productController.renderProductList(req, res);
// });
// app.get("/products/:id", (req, res) => {
//   productController.renderProducById(req, res);
// });
// app.get("/", (req, res) => {
//   res.render("index");
// });
// app.get("*", (req, res) => {
//   res.render("notFound");
// });
const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});

// ** API ENDPOINTS **
// app.get("/api/products", (req, res) => productController.getProducts(req, res));
// app.get("/api/products/:id", (req, res) =>
//   productController.getProductById(req, res)
// );
// app.post("/api/products", (req, res) =>
//   productController.createProduct(req, res)
// );
// app.patch("/api/products/:id", (req, res) =>
//   productController.updateProduct(req, res)
// );
// app.delete("/api/products/:id", (req, res) =>
//   productController.deleteProduct(req, res)
// );
