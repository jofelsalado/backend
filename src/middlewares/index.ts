import { requireAuthMiddleware } from "./auth.middleware";

export default class Middlewares {
	private app_middlewares: any = {
		requireAuthMiddleware,
	};

	public use(middlewareName: string) {
		return this.app_middlewares[middlewareName];
	}
}
