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

export default function (app: Application) {
	app.use(express.json());
	app.use(cors());
	app.use(helmet());
	app.use(hpp());
	app.use(rateLimit(RATE_LIMIT_CONFIG));
	app.use(compression());
	app.disable("x-powered-by");

	/**
	 * API Healthcheck
	 *
	 * @param request
	 * @param response
	 */
	app.get("/", (request: Request, response: Response) =>
		response.status(200).json({ status: "SERVER-ONLINE" })
	);

	/**
	 * API endpoints per module
	 */
	initializeApiRoutes(app);

	/**
	 * Start server
	 */
	app.listen(process.env.APP_PORT, () => {
		console.log(
			"[APP]: App running in http://localhost:" + process.env.APP_PORT
		);
	});
}
