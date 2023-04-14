import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";
import winston from "winston";
import morgan from "morgan";
import { initializeApiRoutes } from "./router/index";
import Middlewares from "./middlewares";

dotenv.config();

const RATE_LIMIT_CONFIG = {
	windowMs: 10 * 60 * 1000,
	max: 100,
};

export default class App {
	public express: Application;
	private middlewares: Middlewares;

	constructor() {
		this.express = express();
		this.middlewares = new Middlewares();
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

		this.setupHttpLogging();
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

	private setupHttpLogging() {
		const logger = winston.createLogger({
			level: "http",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf((m) => {
					console.log(m);
					return `${m.timestamp} [${m.level}] ${m.message}`;
				})
			),
			transports: [
				new winston.transports.Console({ level: "http" }),
				new winston.transports.File({ filename: "logs/http.log" }),
			],
		});

		this.express.use(
			morgan(":method :url :status - :response-time ms", {
				stream: {
					write: (message) => {
						logger.http(message);
					},
				},
			})
			// morgan("tiny")
		);
	}

	public runApp() {
		this.express.listen(process.env.APP_PORT, () => {
			console.log("[APP]: App running in http://localhost:" + process.env.APP_PORT);
		});
	}
}
