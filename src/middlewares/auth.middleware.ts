import { Request, Response, NextFunction } from "express";
import JWTService from "./../services/jwt.service";

const jwtService = new JWTService();

export const requireAuthMiddleware = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const authToken = request.headers.authorization;

	if (typeof authToken === "undefined") {
		return response.status(401).json({ message: "AUTH_UNAUTHORIZED_ACCESS" });
	}

	if (
		typeof authToken !== "undefined" &&
		!jwtService.verifyAccessToken(authToken).isValid
	) {
		return response.status(403).json({ message: "AUTH_FORBIDDEN_ACCESS" });
	}

	next();
};
