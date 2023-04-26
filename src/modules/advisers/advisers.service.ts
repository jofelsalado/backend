import { Adviser, Product } from "@prisma/client";
import PrismaService from "./../../services/prisma.service";
import { AdviserDto } from "./advisers.dto";

export default class AdvisersService {
	private prismaService: PrismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public getAdviserProducts = async (adviserId: number) => {
		const products: Product[] | Product = await this.prismaService.prisma.product.findMany({
			where: {
				adviserId,
			},
		});

		return products;
	};

	public createAdviser = async (adviserData: AdviserDto, userId: number) => {
		const adviser = await this.prismaService.prisma.adviser.create({
			data: { ...adviserData },
		});

		const connectAdviserToUser = await this.prismaService.prisma.user.update({
			where: { id: Number(userId) },
			data: {
				adviser: {
					connect: {
						id: adviser.id,
					},
				},
			},
		});

		if (adviser) {
			return {
				isCreated: true,
				adviser,
			};
		}
		return {
			isCreated: false,
		};
	};

	public deleteAdviser = async (adviserId: number) => {
		const adviser = await this.prismaService.prisma.adviser.findUnique({
			where: { id: Number(adviserId) },
		});

		if (adviser) {
			await this.prismaService.prisma.user.delete({
				where: { id: Number(adviserId) },
			});

			return {
				isDeleted: true,
				adviser,
			};
		}

		return {
			isDeleted: false,
		};
	};
}
