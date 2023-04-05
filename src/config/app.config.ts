import * as dotenv from "dotenv";
dotenv.config();

export const env = (key: string): string => {
	// @ts-ignore
	return process.env["APP_" + key];
};
