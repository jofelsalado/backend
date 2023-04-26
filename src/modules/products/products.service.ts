import { Product } from "@prisma/client";
import PrismaService from "../../services/prisma.service";
import { ProductDto } from "./products.dto";

export default class ProductsService {
	private prismaService: PrismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public getProducts = async (params: any) => {
		const products: Product[] | [] | any = await this.prismaService.prisma.product.findMany({
			include: {
				adviser: true,
			},
		});

		const productsList = async () => {
			return Promise.all(
				await products.map(async (p: any, idx: any) => {
					if (p.adviserId !== null) {
						const user: any = await this.prismaService.prisma.user.findUnique({
							where: { id: Number(p.adviser.userId) },
						});

						products[idx].adviserData = {
							rating: p.adviser.rating,
							expertise: p.adviser.expertise,
							company: p.adviser.company,
							user: user,
						};
						return products[idx];
					} else {
						products[idx].adviserData = null;
						return products[idx];
					}
				})
			);
		};

		return productsList().then((d: any) => d);
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

		if (user) {
			// @ts-ignore
			delete user.id;
			// @ts-ignore
			delete user.password;
			// @ts-ignore
			delete user.createdAt;
			// @ts-ignore
			delete user.updatedAt;
		}

		return {
			product,
			adviser: {
				rating: product.adviser.rating,
				expertise: product.adviser.expertise,
				company: product.adviser.company,
				...user,
			},
		};
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
