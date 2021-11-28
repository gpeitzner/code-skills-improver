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
		const executionScript = `${executionDirectory}/app.py`;
		fs.writeFileSync(executionScript, baseCode);
		const { stderr, stdout } = await commander(
			`docker run --rm --name ${executionName} -v ${executionDirectory}:/usr/src/myapp -w /usr/src/myapp python:3 python app.py`
		);
		if (stderr)
			return res.status(404).json({
				message: "Critical error while executing code",
				data: req.body,
				error: stderr,
			});
		fs.rmdirSync(executionDirectory, { recursive: true });
		return res.json({
			message: stdout.split("\n")[0],
		});
	} catch (error) {
		return res.status(500).json({
			message: "Critical error while executing code",
			data: req.body,
			error: error,
		});
	}
});

export default router;
