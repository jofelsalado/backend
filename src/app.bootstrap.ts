import { Application } from "express";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import compression from "compression";
import * as dotenv from "dotenv";
dotenv.config();

const RATE_LIMIT_CONFIG = {
	windowMs: 10 * 60 * 1000,
	max: 100,
};

export default function (app: Application) {
	app.use(helmet());
	app.use(hpp());
	app.use(rateLimit(RATE_LIMIT_CONFIG));
	app.use(compression());
	app.disable("x-powered-by");

	/**
	 * API Healthcheck
	 */
	app.get("/", (request, response) => response.status(200).json({ status: "SERVER-ONLINE" }));

	/**
	 * Start server
	 */
	app.listen(process.env.APP_PORT, () => {
		console.log("[APP]: App running in http://localhost:" + process.env.APP_PORT);
	});
}
