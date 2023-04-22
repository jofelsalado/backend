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

			if (data.isCreated) {
				return response.status(201).json({ data });
			}

			return response.status(400).json({ message: "FAILED_TO_CREATE_PRODUCT" });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public updateProductHandler = async (request: Request, response: Response) => {
		try {
			const requestValidated = await validateDTO(ProductDto, request.body);

			if (requestValidated.isError) {
				return response.status(400).json(requestValidated.errors);
			}

			const data = await this.productsService.updateProduct(
				Number(request.params.id),
				request.body
			);

			if (data.isUpdated) {
				return response.status(201).json({ data });
			}

			return response.status(400).json({ message: "FAILED_TO_UPDATE_PRODUCT" });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public deleteProductHandler = async (request: Request, response: Response) => {
		try {
			const data = await this.productsService.deleteProduct(Number(request.params.id));

			if (data.isDeleted) {
				return response.status(204).json({ data });
			}

			return response.status(400).json({ message: "FAILED_TO_DELETE_PRODUCT" });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};
}
