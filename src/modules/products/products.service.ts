import PrismaService from "../../services/prisma.service";

export default class ProductsService {
	private prismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}
}
