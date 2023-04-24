import { Adviser } from "@prisma/client";
import PrismaService from "./../../services/prisma.service";
import { AdviserDto } from "./advisers.dto";

export default class AdvisersService {
	private prismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public createAdviser = async (adviserData: AdviserDto) => {
		const adviser: Adviser = await this.prismaService.prisma.adviser.create({
			data: { ...adviserData },
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
