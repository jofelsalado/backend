import { Response, Request } from "express";

export default class AuthController {
	public loginHandler(request: Request, response: Response) {
		return response.status(200).json({
			message: "AUTH_LOGIN_SUCCESS",
			data: {
				id: 1,
			},
		});
	}

	public logoutHandler(request: Request, response: Response) {
		//
	}
}
