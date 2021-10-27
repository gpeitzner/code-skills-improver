import express from "express";
import { Query } from "../models/query";
const router = express.Router();

import pool from "../utils/db";
import querys from "../utils/querys";

/**
 * QUERY CONTROLLER
 */
router.post("/:queryName", async (req, res, next) => {
	const queryName: string = req.params.queryName;
	const values = req.body;

	let queryValues: string[] = [];
	if (values) {
		const attributes: string[] = Object.keys(values);
		for (let i = 0; i < attributes.length; i++) {
			queryValues.push(values[attributes[i]]);
		}
	}

	const client = await pool.connect();
	try {
		let query: Query | any = querys.find(
			(query: Query) => query.name === queryName
		);
		if (query.dml) {
			const data = await client.query(query["dml"], queryValues);
			res.json({
				message: "Query executed",
				query: queryName,
				data: req.body,
				rows: data.rows,
			});
		} else {
			throw Error;
		}
	} catch (error) {
		res.status(500).json({
			message: "Error while executing query",
			query: queryName,
			data: req.body,
			error: error,
		});
	} finally {
		client.release();
	}
});

export default router;
