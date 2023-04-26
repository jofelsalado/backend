import { Product } from "@prisma/client";
import PrismaService from "../../services/prisma.service";
import { ProductDto } from "./products.dto";

export default class ProductsService {
	private prismaService: PrismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public getProducts = async (params: any) => {
		const products: Product[] | [] = await this.prismaService.prisma.product.findMany();

		return products;
	};

	public getProductById = async (productId: number) => {
		const product: Product | any = await this.prismaService.prisma.product.findUnique({
			where: {
				id: Number(productId),
			},
			include: {
				adviser: true,
			},
		});

		const user = await this.prismaService.prisma.user.findUnique({
			where: { id: Number(product.adviser.userId) },
		});

		return { product, ...user };
	};

	public createProduct = async (productData: ProductDto) => {
		const product: Product | any = await this.prismaService.prisma.product.create({
			data: productData,
			include: {
				adviser: true,
			},
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
