import { Application } from "express";

/**
 * Module Routers
 */
import AuthRouter from "@/src/modules/auth/auth.router";

const ROUTER = {
	$auth: new AuthRouter(),
};

export const initializeApiRoutes = (app: Application) => {
	app.use("/api/v1", ROUTER.$auth.getRoutes);

	ROUTER.$auth.getRoutes.stack
		.filter((r: any) => r.route)
		.forEach((r: any) => console.log({ path: r.route.path, method: r.route.stack[0].method }));
};
