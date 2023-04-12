import jwt from "jsonwebtoken";
import { env } from "./../config/app.config";

export default class JWTService {
	private JWT_KEY: string = env("JWT_SECRET_KEY");

	public createAccessToken = (payload: any): string => {
		return jwt.sign(payload, this.JWT_KEY, {
			expiresIn: "2d",
		});
	};

	public revokeAccessToken = (authToken: string) => {
		//
	};

	public verifyAccessToken = (authToken: string): any => {
		return jwt.verify(authToken, this.JWT_KEY, (err, user) => {
			if (err) {
				return {
					isValid: false,
				};
			}

			return {
				isValid: true,
			};
		});
	};

	public decodeAccessToken = (authToken: string): any => {
		//
	};
}
