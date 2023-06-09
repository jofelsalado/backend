import PrismaService from "./../src/services/prisma.service";
import { hashPassword } from "./../src/utilities/password.util";

import randomString from "randomstring";

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
				accountNo: "ACCT041120231549",
				avatarImage: "NA",
				firstName: "Admin",
				middleName: "",
				lastName: "Account",
				email: "admin@allcarebusiness.com",
				username: "admin2023",
				password: await hashPassword("admin2023"),
				gender: "NA",
				address: "NA",
				birthdate: "NA",
				contactNo: "NA",
				userTypeId: 1,
			},
			{
				accountNo: "ACCT042220231153",
				avatarImage: "NA",
				firstName: "Lead",
				middleName: "",
				lastName: "Account",
				email: "lead@allcarebusiness.com",
				username: "lead2023",
				password: await hashPassword("lead2023"),
				gender: "NA",
				address: "NA",
				birthdate: "NA",
				contactNo: "NA",
				userTypeId: 2,
			},
			{
				accountNo: "ACCT041320231156",
				avatarImage: "NA",
				firstName: "Adviser",
				middleName: "",
				lastName: "Account",
				email: "adviser@allcarebusiness.com",
				username: "adviser2023",
				password: await hashPassword("adviser2023"),
				gender: "NA",
				address: "NA",
				birthdate: "NA",
				contactNo: "NA",
				userTypeId: 3,
			},
		],
	});

	const lead = await prismaService.prisma.lead.create({
		data: {
			rating: "N/A",
			company: "N/A",
			userId: 2,
		},
	});

	const adviser = await prismaService.prisma.adviser.create({
		data: {
			rating: "N/A",
			company: "N/A",
			expertise: "N/A",
			credentialLink: "N/A",
			userId: 2,
		},
	});

	await prismaService.prisma.user.update({
		where: {
			id: Number(2),
		},
		data: {
			adviser: {
				connect: {
					id: lead.id,
				},
			},
		},
	});

	await prismaService.prisma.user.update({
		where: {
			id: Number(3),
		},
		data: {
			adviser: {
				connect: {
					id: adviser.id,
				},
			},
		},
	});

	for (let i = 0; i <= 50; i++) {
		const sku: string = String(randomString.generate(10)).toUpperCase();
		await prismaService.prisma.product.create({
			data: {
				sku: sku,
				name: "Product - " + sku,
				description: randomString.generate(100),
				type: "product",
				quotation: "N/A",
				status: "pending",
				meetingType: "N/A",
				url: "/product/sku/" + sku,
			},
		});
	}
}

main();
