import { Request, Response } from "express";
import ProductService from "../services/productServices";

export default class ProductsViewController {
  constructor(private productService: ProductService) {
    this.renderProductsList = this.renderProductsList.bind(this);
    this.renderProductPage = this.renderProductPage.bind(this);
  }

  renderProductsList(req: Request, res: Response) {
    res.render("products", {
      pageTitle: "My Store - Products Page",
      description: "This is awesome store",
      products: this.productService.findAll(),
    });
  }

  renderProductPage(req: Request, res: Response) {
    const productId = +req.params.id;
    const product = this.productService.getProductById(productId);

    res.render("product", {
      pageTitle: `My Store - ${product?.title}`,
      product,
    });
  }
}
// export default class Product {
//   constructor(public id: number, public name: string, public price: number) {}
//   calculateDiscount(discount: number): number {
//     return this.price * (1 - discount / 100);
//   }
//   updatePrice(newPrice: number): void {
//     this.price = newPrice;
//   }
//   displayInfo(): void {
//     console.log(
//       `Product ID: ${this.id}, Name: ${this.name}, Price: $${this.price}`
//     );
//   }
//   static comparePrices(product1: Product, product2: Product): number {
//     return product1.price - product2.price;
//   }
//   static calculateAveragePrice(products: Product[]): number {
//     let totalPrice = products.reduce((sum, product) => sum + product.price, 0);
//     return totalPrice / products.length;
//   }
//   static findCheapestProduct(products: Product[]): Product {
//     return products.reduce((cheapestProduct, product) =>
//       product.price < cheapestProduct.price ? product : cheapestProduct
//     );
//   }
//   static findMostExpensiveProduct(products: Product[]): Product {
//     return products.reduce((mostExpensiveProduct, product) =>
//       product.price > mostExpensiveProduct.price
//         ? product
//         : mostExpensiveProduct
//     );
//   }
//   static filterByPriceRange(
//     products: Product[],
//     minPrice: number,
//     maxPrice: number
//   ): Product[] {
//     return products.filter(
//       (product) => product.price >= minPrice && product.price <= maxPrice
//     );
//   }
//   static sortProductsByName(products: Product[]): Product[] {
//     return products.sort((product1, product2) =>
//       product1.name.localeCompare(product2.name)
//     );
//   }
//   static sortProductsByPriceDescending(products: Product[]): Product[] {
//     return products.sort(
//       (product1, product2) => product2.price - product1.price
//     );
//   }
//   static findProductsBySubstring(
//     products: Product[],
//     substring: string
//   ): Product[] {
//     return products.filter((product) =>
//       product.name.toLowerCase().includes(substring.toLowerCase())
//     );
//   }
//   static findProductsByCategory(
//     products: Product[],
//     category: string
//   ): Product[] {
//     return products.filter(
//       (product: any) => (product.category as string) === category
//     );
//   }
// }

//
