import express from "express";
import App from "./src/app.bootstrap";

try {
	const mainApp = new App();
	mainApp.runApp();
} catch (error) {
	process.exit(1);
}
