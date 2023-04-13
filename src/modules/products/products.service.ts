import { Product } from "@prisma/client";
import PrismaService from "../../services/prisma.service";

export default class ProductsService {
	private prismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public getProducts = async () => {
		const products : Product[] | [] = await this.prismaService.prisma.product.findMany()

		return products
	}
}
