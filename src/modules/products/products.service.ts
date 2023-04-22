import { Product } from "@prisma/client";
import PrismaService from "../../services/prisma.service";
import { ProductDto } from "./products.dto";

export default class ProductsService {
	private prismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public getProducts = async (params: any) => {
		const products: Product[] | [] = await this.prismaService.prisma.product.findMany();
		console.log(products);

		return products;
	};

	public getProductById = async (productId: number) => {
		const product: Product | null = await this.prismaService.prisma.product.findUnique({
			where: {
				id: Number(productId),
			},
		});

		return product;
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

	public updateProduct = async (productId: number, productData: ProductDto) => {
		const product: Product = await this.prismaService.prisma.product.update({
			where: {
				id: Number(productId),
			},
			data: {
				...productData,
			},
		});

		if (product) {
			return {
				isUpdated: true,
				product,
			};
		}

		return {
			isUpdated: false,
		};
	};

	public deleteProduct = async (productId: number) => {
		const product = await this.prismaService.prisma.product.findUnique({
			where: { id: Number(productId) },
		});

		if (product) {
			await this.prismaService.prisma.product.delete({
				where: { id: Number(productId) },
			});

			return {
				isDeleted: true,
				product,
			};
		}

		return {
			isDeleted: false,
		};
	};
}
