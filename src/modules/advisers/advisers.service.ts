import { Adviser } from "@prisma/client";
import PrismaService from "./../../services/prisma.service";
import { AdviserDto } from "./advisers.dto";

export default class AdvisersService {
	private prismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public createAdviser = (adviserData: AdviserDto) => {
		//
	};

	public deleteAdviser = (adviserId: number) => {
		//
	};
}
