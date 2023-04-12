import { Request, Response } from "express";
import ProductsService from "./products.service";

export default class ProductsController {
	private productsService;

	constructor() {
		this.productsService = new ProductsService();
	}

	public getProductsHandler = async (request: Request, response: Response) => {
		try {
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public getProductByIdHandler = async (request: Request, response: Response) => {
		try {
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public createProductHandler = async (request: Request, response: Response) => {
		try {
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public updateProductHandler = async (request: Request, response: Response) => {
		try {
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public deleteProductHandler = async (request: Request, response: Response) => {
		try {
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};
}
