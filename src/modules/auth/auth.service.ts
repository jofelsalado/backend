import PrismaService from "@/src/services/prisma.service";
import JWTService from "@/src/services/jwt.service";
import { verifyPassword } from "@/src/utilities/password.util";
import { CredentialsDTO } from "./auth.dto";

export default class AuthService {
	private prismaService;
	private jwtService;

	constructor() {
		this.prismaService = new PrismaService();
		this.jwtService = new JWTService();
	}

	public async login(credentials: CredentialsDTO) {
		const user = await this.prismaService.prisma.user.findUnique({
			where: {
				email: credentials.email,
			},
		});

		console.log(user);

		if (user && (await verifyPassword(credentials.password, user.password))) {
			const accessToken = this.jwtService.createAccessToken(user);

			return {
				isAuthSuccess: true,
				user,
				accessToken,
			};
		}

		return {
			isAuthSuccess: false,
		};
	}
}
