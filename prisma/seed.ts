import PrismaService from "./../src/services/prisma.service";
import { hashPassword } from "./../src/utilities/password.util";

const prismaService = new PrismaService();

async function main() {
	await prismaService.prisma.userType.createMany({
		data: [
			{
				name: "Admin",
			},
			{
				name: "Leads",
			},
			{
				name: "Advisor",
			},
		],
	});
}

main();
