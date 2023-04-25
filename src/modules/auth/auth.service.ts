import PrismaService from "./../../services/prisma.service";
import JWTService from "./../../services/jwt.service";
import { verifyPassword } from "./../../utilities/password.util";
import { CredentialsDTO } from "./auth.dto";

export default class AuthService {
	private prismaService;
	private jwtService;

	constructor() {
		this.prismaService = new PrismaService();
		this.jwtService = new JWTService();
	}

	public login = async (credentials: CredentialsDTO) => {
		const user = await this.prismaService.prisma.user.findUnique({
			where: {
				email: credentials.email,
			},
			include: {
				userType: true,
				adviser: true,
			},
		});

		if (user && (await verifyPassword(credentials.password, user.password))) {
			// @ts-ignore
			delete user["password"];
			const accessToken = this.jwtService.createAccessToken(user);

			return {
				isAuthSuccess: true,
				accessToken,
				user,
			};
		}

		return {
			isAuthSuccess: false,
		};
	};

	public logout = async (authToken: string) => {
		console.log(authToken);
	};
}
