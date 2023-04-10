import { Request, Response } from "express";
import { CredentialsDTO } from "./auth.dto";
import { validateDTO } from "@/src/utilities/dto-validator.util";

export default class AuthController {
	public async loginHandler(request: Request, response: Response) {
		try {
			const requestValidated = await validateDTO(CredentialsDTO, request.body);

			if (requestValidated.isError) {
				return response.status(400).json(requestValidated.errors);
			}

			return response
				.status(200)
				.json({ status: "AUTH_LOGIN_SUCCESS", user: request.body });
		} catch (error) {
			return response.status(500).json({ code: 500, error });
		}
	}

	public logoutHandler(request: Request, response: Response) {
		try {
		} catch (error) {
			return response.status(500).json({ code: 500, error });
		}
	}
}
