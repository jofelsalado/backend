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

	await prismaService.prisma.user.createMany({
		data: [
			{
				accountNo: "ACCT041020231906",
				name: "Admin Account",
				email: "admin@allcarebusinesss.com",
				password: await hashPassword("admin2023"),
				userTypeId: Number(1),
			},
			{
				accountNo: "ACCT041020231907",
				name: "Leads Account",
				email: "leads@allcarebusinesss.com",
				password: await hashPassword("leads2023"),
				userTypeId: Number(2),
			},
			{
				accountNo: "ACCT041020231908",
				name: "Advisor Account",
				email: "advisor@allcarebusinesss.com",
				password: await hashPassword("advisor2023"),
				userTypeId: Number(3),
			},
		],
	});
}

main();
