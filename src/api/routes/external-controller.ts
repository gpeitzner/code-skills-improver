import express from "express";
const router = express.Router();

import pool from "../utils/db";
import util from "util";
import { exec } from "child_process";
import fs from "fs";

const commander = util.promisify(exec);

router.post("/execution", async (req, res, next) => {
  const executionName = Date.now();
  const executionDirectory = `${__dirname}/executions/${executionName}`;
  const executionScript = `${executionDirectory}/app.py`;
  try {
    const { baseCode } = req.body;
    fs.mkdirSync(executionDirectory, {
      recursive: true,
    });
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
    return res.json({
      message: stdout.split("\n")[0],
    });
  } catch (error: any) {
    if (error.stderr) {
      let stderr = error.stderr.split("\n");
      stderr.shift();
      error = stderr;
    }
    return res.status(500).json({
      message: "Critical error while executing code",
      data: req.body,
      error: error,
    });
  } finally {
    fs.rmdirSync(executionDirectory, { recursive: true });
  }
});

export default router;
