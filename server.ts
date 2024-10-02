import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import { generateFakeProducts } from "./utils/fakeData";
import compression from "compression";
import ProductService from "./services/productServices";
import ProductController from "./controllers/productController";
import path from "path";
import ProductsRouter from "./routes/products";
import ProductsViewController from "./controllers/productViewController";
import ErrorMiddleware from "./middlewares/Errors";
import ErrorNotFoundMiddleware from "./middlewares/NotFound";
import pool from "./model/db";

const app = express();

const limiterOptions = {
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "To Many requests per second and to many requests per second",
};
// ** FOR .ENV FILES **
dotenv.config();
// #####################
app.use(express.json());
// ! Danger: اوعا تعمل السطر ده ف البرودكشن معمول بس عشان الصور تشتغل
// ** MIDDLEWARES
app.use(
  helmet({
    contentSecurityPolicy: false,
    xFrameOptions: { action: "deny" },
  })
);
app.use(compression());
app.use(morgan("dev"));
app.use(rateLimit(limiterOptions));
// ** END: MIDDLEWARES
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

// TEST DB FOR API AND RETREIVE PRODUCTS
app.get("/db/products", async (req, res) => {
  // ** I/O OPERATIONS TAKE WHILE **
  try {
    const products = await pool.query("SELECT * FROM products");
    res.json({
      products: products.rows,
      length: products.rowCount,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send("Server error");
  }
});

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

// ** MIDDLEWARES
app.use(ErrorMiddleware.handle);
app.use(ErrorNotFoundMiddleware.handle);

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
