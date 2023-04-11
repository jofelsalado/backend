import { Request, Response } from "express";
import AuthService from "./auth.service";
import { CredentialsDTO } from "./auth.dto";
import { validateDTO } from "@/src/utilities/dto-validator.util";

export default class AuthController {
	public authService: any;

	constructor() {
		this.authService = new AuthService();
	}

	public async loginHandler(request: Request, response: Response) {
		try {
			const requestValidated = await validateDTO(CredentialsDTO, request.body);

			if (requestValidated.isError) {
				return response.status(400).json(requestValidated.errors);
			}

			const data = await this.authService.login(request.body);

			if (!data.isAuthSuccess) {
				return response.status(401).json({ status: "AUTH_LOGIN_FAILED" });
			}

			return response
				.status(200)
				.json({ status: "AUTH_LOGIN_SUCCESS", ...data });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ code: 500 });
		}
	}

	public logoutHandler(request: Request, response: Response) {
		try {
		} catch (error) {
			return response.status(500).json({ code: 500, error });
		}
	}
}
