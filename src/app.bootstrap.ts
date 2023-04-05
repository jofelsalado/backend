import { Application } from "express";
import helmet from "helmet";
import xssClean from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import compression from "compression";
import * as dotenv from "dotenv";
dotenv.config();

const RATE_LIMIT_CONFIG = {
	windowMs: 10 * 60 * 1000,
	max: 100,
};

export default async function (app: Application) {
	app.use(helmet());
	app.use(xssClean());
	app.use(hpp());
	app.use(rateLimit(RATE_LIMIT_CONFIG));
	app.use(compression());
	app.disable("x-powered-by");
}
