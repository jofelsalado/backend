import { Router } from "express";
import AuthController from "./auth.controller";

export default class AuthRouter {
	private authController: AuthController;
	private router: Router;

	constructor() {
		this.authController = new AuthController();
		this.router = Router();

		this.setupRoutes();
	}

	private setupRoutes(): void {
		this.router.post("/auth/login", this.authController.loginHandler);
		this.router.post("/auth/logout", this.authController.logoutHandler);
	}

	get getRoutes() {
		return this.router;
	}
}
