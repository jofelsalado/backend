import { Request, Response } from "express";
import ProductsService from "./products.service";
import { ProductDto } from "./products.dto";
import { validateDTO } from "./../../utilities/dto-validator.util";

export default class ProductsController {
	private productsService;

	constructor() {
		this.productsService = new ProductsService();
	}

	public getProductsHandler = async (request: Request, response: Response) => {
		try {
			const params = request.params;
			const data = await this.productsService.getProducts(params);

			return response.status(200).json(data);
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public getProductByIdHandler = async (request: Request, response: Response) => {
		try {
			const data = await this.productsService.getProductById(Number(request.params.id));

			if (!data) {
				return response.status(404).json(null);
			}

			return response.status(200).json({ data });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public createProductHandler = async (request: Request, response: Response) => {
		try {
			const requestValidated = await validateDTO(ProductDto, request.body);

			if (requestValidated.isError) {
				return response.status(400).json(requestValidated.errors);
			}

			const data = await this.productsService.createProduct(request.body);
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
