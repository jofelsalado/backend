import { Router } from "express";
import ProductsController from "./produts.controller";
import Middlewares from "../../middlewares";

export default class ProductsRouter {
	private productsController: ProductsController;
	private middlewares: Middlewares;
	private router: Router;

	constructor() {
		this.productsController = new ProductsController();
		this.middlewares = new Middlewares();
		this.router = Router();

		this.setupRoutes();
	}

	private setupRoutes(): void {
		this.router
			.get("/products", this.productsController.getProductsHandler)
			.get("/product/:id", this.productsController.getProductByIdHandler)
			.post("/products", this.productsController.createProductHandler);
	}

	get getRoutes() {
		return this.router;
	}
}
