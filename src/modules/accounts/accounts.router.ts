import { Router } from "express";
import AccountsController from "./accounts.controller";

export default class AccountsRouter {
	private accountsController: AccountsController;
	private router: Router;

	constructor() {
		this.accountsController = new AccountsController();
		this.router = Router();

		this.setupRoutes();
	}

	private setupRoutes(): void {
		this.router
			.get("/accounts", this.accountsController.getAccountsHandler)
			.post("/accounts", this.accountsController.createAccountHandler)
			.get("/accounts/by-type/:type", this.accountsController.getAccountsByTypeHandler)
			.patch("/accounts/:id", this.accountsController.updateAccountHandler)
			.get("/accounts/:id", this.accountsController.getAccountByIdHandler)
			.delete("/accounts/:id", this.accountsController.deleteAccountHandler);
	}

	get getRoutes() {
		return this.router;
	}
}
