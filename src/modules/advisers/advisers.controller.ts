import { Request, Response } from "express";
import AdvisersService from "./advisers.service";
import { ConsultationDto } from "./advisers.dto";
import { validateDTO } from "./../../utilities/dto-validator.util";

export default class AdvisersController {
	private advisersService: AdvisersService;

	constructor() {
		this.advisersService = new AdvisersService();
	}

	public getConsultationsHandler = async (request: Request, response: Response) => {
		try {
			const data = await this.advisersService.getAdviserConsultations();

			return response.status(200).json({ data });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public getConsultationByIdHandler = async (request: Request, response: Response) => {
		try {
			const data = await this.advisersService.getAdviserConsultationById(Number(request.params.id));

			if (!data) {
				return response.status(404).json(null);
			}

			return response.status(200).json({ data });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public getConsultationsByAdviserIdHandler = async (request: Request, response: Response) => {
		try {
			const data = await this.advisersService.getAdviserConsultationsByAdviserId(Number(request.params.id));

			return response.status(200).json({ data });
		} catch (error) {
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};

	public createConsultationHandler = async (request: Request, response: Response) => {
		try {
			const requestValidated = await validateDTO(ConsultationDto, request.body);

			if (requestValidated.isError) {
				return response.status(400).json(requestValidated.errors);
			}

			const data = await this.advisersService.createAdviserConsultation(request.body);

			return response.status(201).json({ data });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
		}
	};
}
