import jwt from "jsonwebtoken";
import PrismaService from "./prisma.service";
import { env } from "./../config/app.config";

export default class JWTService {
	private JWT_KEY: string = env("JWT_SECRET_KEY");
	private prismaService: PrismaService;

	constructor() {
		this.prismaService = new PrismaService();
	}

	public createAccessToken = (payload: any): string => {
		return jwt.sign(payload, this.JWT_KEY, {
			expiresIn: "1d",
			algorithm: "HS256",
		});
	};

	public revokeAccessToken = async (authToken: string) => {
		const revokedToken = await this.prismaService.prisma.userJWTBlacklist.create({
			data: {
				token: authToken,
			},
		});

		return {
			isLogoutSuccess: revokedToken ? true : false,
		};
	};

	public verifyAccessToken = (authToken: string): any => {
		return jwt.verify(authToken, this.JWT_KEY, (err, user) => {
			if (err) {
				console.log(err);
				return {
					isValid: false,
				};
			}

			return {
				isValid: true,
				data: {
					user,
				},
			};
		});
	};

	public decodeAccessToken = (authToken: string): any => {
		const user = this.verifyAccessToken(authToken);

		if (user.isValid) {
			return user.data.user;
		}

		return null;
	};
}
