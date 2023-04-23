import { Router } from "express";
import AdvisersController from "./advisers.controller";

export default class AdvisersRouter {
	private advisersController: AdvisersController;
	private router: Router;

	constructor() {
		this.advisersController = new AdvisersController();
		this.router = Router();
	}

	private setupRoutes(): void {
		//
	}

	get getRoutes() {
		return this.router;
	}
}
