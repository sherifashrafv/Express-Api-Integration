import express, { Request, Response } from "express";
import { generateFakeProducts } from "./utils/fakeData";
import { Product } from "../interfaces/index";
import ProductController from "./controllers/productController";
import { ProductServce } from "./services/productServices";

const app = express();
const PORT: number = 8000;

// initialize middlewares will be called on every request
app.use(express.json());
// get home page
app.get("/", (req, res) => {
  res.send("<h1>>Hello, World!</h1");
  res.end();
});

// START MVC Application
const FAKE_DUMMY_PRODUCTS = generateFakeProducts();

const productService = new ProductServce();

const productController = new ProductController(productService);

// ** FAKE DUMMY-DATA (PRODUCTS)
// ** Endpoints GET (PRODUCTS)
app.get("/products", (req: Request, res: Response) => {
  return res.send(productController.getProducts());
  // const filterQuery = req.query.filter as string;
  // let filteredProducts = FAKE_DUMMY_PRODUCTS;
  // // Apply filtering if filterQuery is present
  // if (filterQuery) {
  //   const propertiesToFilter = filterQuery.split(",");
  //   filteredProducts = FAKE_DUMMY_PRODUCTS.map((product) => {
  //     const filteredProduct = { ...product };
  //     Object.keys(filteredProduct).forEach((key) => {
  //       if (!propertiesToFilter.includes(key)) {
  //         delete filteredProduct[key as keyof Product];
  //       }
  //     });
  //     return filteredProduct;
  //   });
  //   res.json(filteredProducts);
  // }
  // // Send filtered or unfiltered products as a response
  // res.json(FAKE_DUMMY_PRODUCTS);
});
// Single Product (PRODUCT) Route params
app.get("/products/:id", (req: Request, res: Response) => {
  const productId = +req.params.id;
  // ** CHECK FOR THE PRODUCT NOT EQUAL TO NUMURIC
  if (isNaN(productId)) {
    res.status(404).send({ message: "invlaid product not found" });
  }
  const findProduct: Product | undefined = FAKE_DUMMY_PRODUCTS.find(
    (product) => product.id === productId
  );
  if (findProduct) {
    res.send(findProduct);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
  res.end();
});
// ** ENDPOINTS POST (PRODUCTS)
app.post("/products", (req: Request, res: Response) => {
  const newProduct = req.body;
  const newProductId = FAKE_DUMMY_PRODUCTS.length + 1;
  //
  FAKE_DUMMY_PRODUCTS.push({
    id: newProductId,
    ...newProduct,
  });
  //
  res.status(201).send({
    id: newProduct,
    title: newProduct.title,
    price: newProduct.price,
  });
  console.log(req.body);
});

// ** ENDPOINTS EDIT (PRODUCTS)
app.patch("/products/:id", (req: Request, res: Response) => {
  const productId = +req.params.id;

  // Check if the productId is a valid number
  if (isNaN(productId)) {
    return res.status(404).send({ message: "Invalid product not found" });
  }

  const productIndex: number = FAKE_DUMMY_PRODUCTS.findIndex(
    (p) => p.id === productId
  );

  const productBody = req.body;

  if (productIndex !== -1) {
    // Spread the existing product and the new data from productBody
    FAKE_DUMMY_PRODUCTS[productIndex] = {
      ...FAKE_DUMMY_PRODUCTS[productIndex],
      ...productBody,
    };

    return res.status(200).send({ message: "Product has been updated!" });
  } else {
    return res.status(404).send({ message: "Product not found!" });
  }
});

// ** DELETE PRODUCT ENDPOINTS (PRODUCTS)
app.delete("/products/:id", (req, res) => {
  const productId = +req.params.id;

  if (isNaN(productId)) {
    return res.status(404).send({ message: "Product not found in database!" });
  }
  const productIndex: number | number = FAKE_DUMMY_PRODUCTS.findIndex(
    (p) => p.id === productId
  );
  if (productIndex !== -1) {
    FAKE_DUMMY_PRODUCTS.splice(productIndex, 1);
    return res.status(200).send({ message: "Product has been deleted!" });
  } else {
    return res.status(404).send({ message: "Product Not  Found !" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
