import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";
import { initializeApiRoutes } from "./router/index";

dotenv.config();

const RATE_LIMIT_CONFIG = {
	windowMs: 10 * 60 * 1000,
	max: 100,
};

export default class App {
	public express: Application;

	constructor() {
		this.express = express();
		this.setupApp();
	}

	private setupApp() {
		this.express.use(express.json());
		this.express.use(cors());
		this.express.use(helmet());
		this.express.use(hpp());
		this.express.use(rateLimit(RATE_LIMIT_CONFIG));
		this.express.use(compression());
		this.express.disable("x-powered-by");

		this.setupRoutes();
	}

	private setupRoutes() {
		/**
		 * API Healthcheck
		 *
		 * @param request
		 * @param response
		 */
		this.express.get("/", (request: Request, response: Response) =>
			response.status(200).json({ status: "SERVER-ONLINE" })
		);

		/**
		 * API endpoints (by module)
		 * @param express
		 */
		initializeApiRoutes(this.express);
	}

	private setupLogging() {
		//
	}

	public runApp() {
		this.express.listen(process.env.APP_PORT, () => {
			console.log("[APP]: App running in http://localhost:" + process.env.APP_PORT);
		});
	}
}
