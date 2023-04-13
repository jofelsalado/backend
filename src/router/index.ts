import { Application } from "express";
import { env } from "./../config/app.config";
import Middlewares from "./../middlewares";

/**
 * Module Routers
 */
import AuthRouter from "./../modules/auth/auth.router";
import ProductsRouter from "./../modules/products/products.router";

const MIDDLEWARES = new Middlewares();
const ROUTER: any = {
	$auth: new AuthRouter(),
	$products: new ProductsRouter(),
};

export const initializeApiRoutes = (app: Application) => {
	app.use("/api/v1", ROUTER.$auth.getRoutes);
	app.use("/api/v1", ROUTER.$products.getRoutes);

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
