import { User } from "@prisma/client";
import randomString from "randomstring";
import PrismaService from "../../services/prisma.service";
import { UserDto } from "./accounts.dto";
import { hashPassword } from "./../../utilities/password.util";

export default class AccountsService {
	private prismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public getAccounts = async (params: any) => {
		const accounts: User[] | [] = await this.prismaService.prisma.user.findMany();

		return accounts;
	};

	public getAccountsByType = async (type: string) => {
		const accounts: User[] | [] = await this.prismaService.prisma.user.findMany({
			where: {
				userType: {
					name: type,
				},
			},
		});

		return accounts;
	};

	public getAccountById = async (accountId: number) => {
		const account: User | null = await this.prismaService.prisma.user.findUnique({
			where: {
				id: Number(accountId),
			},
		});

		return account;
	};

	public createAccount = async (accountData: UserDto) => {
		const account: User = await this.prismaService.prisma.user.create({
			data: {
				...accountData,
				password: await hashPassword(accountData.password),
				accountNo: "ACCNT-" + String(randomString.generate(10)).toUpperCase(),
				avatarImage: "N/A",
			},
		});

		if (account) {
			return {
				isCreated: true,
				account,
			};
		}

		return {
			isCreated: false,
		};
	};

	public updateAccount = async (accountId: number, accountData: UserDto) => {
		const account: User = await this.prismaService.prisma.user.update({
			where: {
				id: Number(accountId),
			},
			data: {
				...accountData,
			},
		});

		if (account) {
			return {
				isUpdated: true,
				account,
			};
		}

		return {
			isUpdated: false,
		};
	};

	public deleteAccount = async (accountId: number) => {
		const account = await this.prismaService.prisma.user.findUnique({
			where: { id: Number(accountId) },
		});

		if (account) {
			await this.prismaService.prisma.user.delete({
				where: { id: Number(accountId) },
			});

			return {
				isDeleted: true,
				account,
			};
		}

		return {
			isDeleted: false,
		};
	};
}
