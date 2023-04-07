import express from "express";
import bootstrapApplication from "@/src/app.bootstrap";

try {
	bootstrapApplication(express());
} catch (error) {
	process.exit(1);
}
