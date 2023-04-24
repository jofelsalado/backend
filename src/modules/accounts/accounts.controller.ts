import { Request, Response } from "express";
import AccountsService from "./accounts.service";
import { UserDto } from "./accounts.dto";
import { validateDTO } from "./../../utilities/dto-validator.util";

export default class AccountsController {
	private accountsService;

	constructor() {
		this.accountsService = new AccountsService();
	}

	public getAccountsHandler = async (request: Request, response: Response) => {
		try {
			const params = request.params;
			const data = await this.accountsService.getAccounts(params);

			return response.status(200).json({ data });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public getAccountsByTypeHandler = async (request: Request, response: Response) => {
		try {
			const data = await this.accountsService.getAccountsByType(request.params.type);

			return response.status(200).json(data);
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public getAccountByIdHandler = async (request: Request, response: Response) => {
		try {
			const data = await this.accountsService.getAccountById(Number(request.params.id));

			if (!data) {
				return response.status(404).json(null);
			}

			return response.status(200).json({ data });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public createAccountHandler = async (request: Request, response: Response) => {
		try {
			const requestValidated = await validateDTO(UserDto, request.body);

			if (requestValidated.isError) {
				return response.status(400).json(requestValidated.errors);
			}

			const data = await this.accountsService.createAccount(request.body);

			if (data.isCreated) {
				return response.status(201).json({ data });
			}

			return response.status(400).json({ message: "FAILED_TO_CREATE_ACCOUNT" });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public updateAccountHandler = async (request: Request, response: Response) => {
		try {
			const requestValidated = await validateDTO(UserDto, request.body);

			if (requestValidated.isError) {
				return response.status(400).json(requestValidated.errors);
			}

			const data = await this.accountsService.updateAccount(
				Number(request.params.id),
				request.body
			);

			if (data.isUpdated) {
				return response.status(201).json({ data });
			}

			return response.status(400).json({ message: "FAILED_TO_UPDATE_ACCOUNT" });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public deleteAccountHandler = async (request: Request, response: Response) => {
		try {
			const data = await this.accountsService.deleteAccount(Number(request.params.id));

			if (data.isDeleted) {
				return response.status(204).json({ data });
			}

			return response.status(400).json({
				message: "FAILED_TO_DELETE_ACCOUNT",
				info: "Account may not exist anymore",
			});
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};
}
