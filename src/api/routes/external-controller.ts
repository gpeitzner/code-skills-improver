import express from "express";
const router = express.Router();

import pool from "../utils/db";
import util from "util";
import { exec } from "child_process";
import fs from "fs";

const commander = util.promisify(exec);

router.post("/execution", async (req, res, next) => {
	try {
		const { baseCode } = req.body;
		const executionName = Date.now();
		const executionDirectory = `${__dirname}/executions/${executionName}`;
		fs.mkdirSync(executionDirectory, {
			recursive: true,
		});
		fs.writeFileSync(`${executionDirectory}/Dockerfile`, "");
		fs.writeFileSync(`${executionDirectory}/app.py`, "");
		const { stderr, stdout } = await commander("ls -lash");
		if (stderr)
			return res.status(404).json({
				message: "Critical error while executing code",
				data: req.body,
				error: stderr,
			});
		res.json({
			message: stdout.split("\n"),
		});
	} catch (error) {
		res.status(500).json({
			message: "Critical error while executing code",
			data: req.body,
			error: error,
		});
	}
});

export default router;
