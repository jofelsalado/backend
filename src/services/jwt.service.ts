import jwt from "jsonwebtoken";
import { env } from "@/src/config/app.config";

export class JWTService {
	private JWT_KEY: string = env("JWT_SECRET_KEY");

	public createAccessToken(payload: any): string {
		return jwt.sign(payload, this.JWT_KEY, { algorithm: "RS512", expiresIn: "2d" });
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
