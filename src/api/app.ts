import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

import crudController from "./routes/crud-controller";
import queryController from "./routes/query-controller";
import externalController from "./routes/external-controller";

const app = express();

app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/crud", crudController);
app.use("/query", queryController);
app.use("/external", externalController);

export default app;
