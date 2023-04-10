import PrismaService from "@/src/services/prisma.service";
import { CredentialsDTO } from "./auth.dto";

export default class AuthService {
	private prismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public login(credentials: CredentialsDTO) {
		return credentials;
	}
}
