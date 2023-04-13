import PrismaService from "./../src/services/prisma.service";
import { hashPassword } from "./../src/utilities/password.util";

const prismaService = new PrismaService();

async function main() {
	// await prismaService.prisma.userType.createMany({
	// 	data: [
	// 		{
	// 			name: "Admin",
	// 		},
	// 		{
	// 			name: "Leads",
	// 		},
	// 		{
	// 			name: "Advisor",
	// 		},
	// 	],
	// });

	// await prismaService.prisma.user.create({
	// 	data: {
	// 		accountNo: "ACCT041120231549",
	// 		avatarImage: "NA",
	// 		firstName: "Admin",
	// 		middleName: "",
	// 		lastName: "Account",
	// 		email: "admin@allcarebusiness.com",
	// 		username: "admin2023",
	// 		password: await hashPassword("admin2023"),
	// 		gender: "NA",
	// 		address: "NA",
	// 		birthdate: "NA",
	// 		contactNo: "NA",
	// 		userTypeId: 1,
	// 	},
	// });

	await prismaService.prisma.user.create({
		data: {
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
	});
}

main();
