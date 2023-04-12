import { Router } from "express";
import AuthController from "./auth.controller";
import Middlewares from "./../../middlewares";
export default class AuthRouter {
	private authController: AuthController;
	private middlewares: Middlewares;
	private router: Router;

	constructor() {
		this.authController = new AuthController();
		this.middlewares = new Middlewares();
		this.router = Router();

		this.setupRoutes();
	}

	private setupRoutes(): void {
		this.router.post("/auth/login", this.authController.loginHandler);
		this.router.post(
			"/auth/logout",
			this.middlewares.use("requireAuthMiddleware"),
			this.authController.logoutHandler
		);
	}

	get getRoutes() {
		return this.router;
	}
}
