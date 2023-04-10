import { PrismaClient } from "@prisma/client";

export default class PrismaService {
	private prismaClient;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	get prisma() {
		return this.prismaClient;
	}
}
