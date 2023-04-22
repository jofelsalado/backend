import { Router } from "express";
import ProductsController from "./produts.controller";

export default class ProductsRouter {
	private productsController: ProductsController;
	private router: Router;

	constructor() {
		this.productsController = new ProductsController();
		this.router = Router();

		this.setupRoutes();
	}

	private setupRoutes(): void {
		this.router
			.get("/products", this.productsController.getProductsHandler)
			.post("/products", this.productsController.createProductHandler)
			.patch("/products/:id", this.productsController.updateProductHandler)
			.get("/products/:id", this.productsController.getProductByIdHandler)
			.delete("/products/:id", this.productsController.deleteProductHandler);
	}

	get getRoutes() {
		return this.router;
	}
}
