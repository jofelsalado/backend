import { Product } from "@prisma/client";
import PrismaService from "../../services/prisma.service";
import { ProductDto } from "./products.dto";

export default class ProductsService {
	private prismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public getProducts = async () => {
		const products: Product[] | [] = await this.prismaService.prisma.product.findMany();

		return products;
	};

	public createProduct = async (productData: ProductDto) => {
		const product: Product = await this.prismaService.prisma.product.create({
			data: productData,
		});

		if (product) {
			return {
				isCreated: true,
				product,
			};
		}

		return {
			isCreated: false,
		};
	};

	public updateProduct = async (productData: ProductDto) => {};

	public deleteProduct = async (productData: ProductDto) => {};
}
