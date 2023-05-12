import { Router } from "express";
import AdvisersController from "./advisers.controller";

export default class AdvisersRouter {
	private advisersController: AdvisersController;
	private router: Router;

	constructor() {
		this.advisersController = new AdvisersController();
		this.router = Router();

		this.setupRoutes();
	}

	private setupRoutes(): void {
		this.router
			.get("/adviser-consultations", this.advisersController.getConsultationsHandler)
			.post("/adviser-consultations", this.advisersController.createConsultationHandler)
			.get("/adviser-consultations/:id", this.advisersController.getConsultationByIdHandler)
			.patch("/adviser-consultations/:id", this.advisersController.updateConsultationByIdHandler)
			.get("/adviser/:id/consultations-history", this.advisersController.getConsultationsByAdviserIdHandler)
			.post("/adviser/:id/add-rating", this.advisersController.addAdviserRatingHandler)
			.get("/adviser/:id/average-ratings", this.advisersController.getAdviserRatingHandler);
	}

	get getRoutes() {
		return this.router;
	}
}
