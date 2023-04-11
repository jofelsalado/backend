import jwt from "jsonwebtoken";
import { env } from "@/src/config/app.config";

export default class JWTService {
	private JWT_KEY: string = env("JWT_SECRET");

	public createAccessToken(payload: any): string {
		console.log(this.JWT_KEY);
		return jwt.sign(payload, this.JWT_KEY, {
			expiresIn: "2d",
		});
	}

	public verifyAccessToken(authToken: string): any {
		return jwt.verify(authToken, this.JWT_KEY, (err, user) => {
			if (err) {
				return err;
			}

			return user;
		});
	}
}
