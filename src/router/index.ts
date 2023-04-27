import { Application } from "express";
import { env } from "./../config/app.config";
import Middlewares from "./../middlewares";

/**
 * Module Routers
 */
import AuthRouter from "./../modules/auth/auth.router";
import AccountsRouter from "./../modules/accounts/accounts.router";
import ProductsRouter from "./../modules/products/products.router";
import AdvisersRouter from "./../modules/advisers/advisers.router";

const MIDDLEWARES = new Middlewares();
const ROUTER: any = {
	$auth: new AuthRouter(),
	$accounts: new AccountsRouter(),
	$products: new ProductsRouter(),
	$advisers: new AdvisersRouter(),
};

export const initializeApiRoutes = (app: Application) => {
	app.use("/api/v1", ROUTER.$auth.getRoutes);
	app.use(
		"/api/v1",
		// MIDDLEWARES.use("requireAuthMiddleware"),
		ROUTER.$accounts.getRoutes
	);
	app.use(
		"/api/v1",
		// MIDDLEWARES.use("requireAuthMiddleware"),
		ROUTER.$products.getRoutes
	);

	app.use(
		"/api/v1",
		// MIDDLEWARES.use("requireAuthMiddleware"),
		ROUTER.$advisers.getRoutes
	);

	Object.keys(ROUTER).map((r: any) =>
		ROUTER[r].router.stack.filter((r: any) => {
			const baseURL: string = `${env("URL")}:${env("PORT")}/api/v1`;

			console.log({
				path: String(baseURL + r.route.path),
				method: String(r.route.stack[0].method).toUpperCase(),
			});
		})
	);
};
