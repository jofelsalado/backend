import { Adviser, AdviserConsultationHistory, Product } from "@prisma/client";
import PrismaService from "./../../services/prisma.service";
import { AdviserDto, ConsultationDto } from "./advisers.dto";

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

		if (adviser && connectAdviserToUser) {
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

	public getAdviserConsultations = async () => {
		const consultations: AdviserConsultationHistory[] | [] = await this.prismaService.prisma.adviserConsultationHistory.findMany();

		return consultations;
	};

	public getAdviserConsultationById = async (consultationId: number) => {
		const consultaion = await this.prismaService.prisma.adviserConsultationHistory.findUnique({
			where: {
				id: Number(consultationId),
			},
		});

		return consultaion;
	};

	public getAdviserConsultationsByAdviserId = async (adviserId: number) => {
		const consultaions: AdviserConsultationHistory[] | [] = await this.prismaService.prisma.adviserConsultationHistory.findMany({
			where: {
				adviserId: Number(adviserId),
			},
		});

		return consultaions;
	};

	public createAdviserConsultation = async (consultationData: ConsultationDto) => {
		const consultation: AdviserConsultationHistory = await this.prismaService.prisma.adviserConsultationHistory.create({
			data: {
				...consultationData,
			},
			include: {
				product: true,
				adviser: true,
			},
		});

		if (consultation) {
			return {
				isCreated: true,
				consultation,
			};
		}

		return {
			isCreated: false,
		};
	};
}
