import { Product } from "@prisma/client";
import PrismaService from "../../services/prisma.service";
import { ProductDto } from "./products.dto";

export default class ProductsService {
	private prismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public getProducts = async () => {
		const products : Product[] | [] = await this.prismaService.prisma.product.findMany()

		return products
	}

	public createProduct = async (product: ProductDto) => {

	}

	public updateProduct = async (product: ProductDto) => {
		
	}

	public deleteProduct = async (product: ProductDto) => {
		
	}
}
