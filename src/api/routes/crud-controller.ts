import express from "express";
const router = express.Router();

import pool from "../utils/db";

/**
 * CREATE CONTROLLER
 */
router.post("/:tableName", async (req, res, next) => {
  try {
    const { tableName }: any = req.params;
    const attributes: string[] = Object.keys(req.body);
    const values: any = req.body;

    let query: string = `INSERT INTO ${tableName}(`;
    let queryAttributes: string = "(";
    let queryValues: string[] = [];
    for (let i = 0; i < attributes.length; i++) {
      if (i === attributes.length - 1) {
        query += `${attributes[i]})`;
        queryAttributes += `$${i + 1})`;
        query += ` VALUES ${queryAttributes}`;
      } else {
        query += `${attributes[i]}, `;
        queryAttributes += `$${i + 1}, `;
      }
      queryValues.push(values[attributes[i]]);
    }
    query += " RETURNING *";

    const client = await pool.connect();
    try {
      const data = await client.query(query, queryValues);
      res
        .status(201)
        .json({ message: "Entity created", table: tableName, data: data.rows });
    } catch (error) {
      res.status(500).json({
        message: "Error while creating an entity",
        table: tableName,
        data: req.body,
        error: error,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      message: "Critical error while creating an entity",
      data: req.body,
      error: error,
    });
  }
});

/**
 * READ CONTROLLER
 */
router.get("/:tableName", async (req, res, next) => {
  try {
    const { tableName }: any = req.params;

    let query: string = `SELECT * FROM ${tableName}`;

    const client = await pool.connect();
    try {
      const data: any = await client.query(query);
      res.status(201).json(data.rows);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting entities",
        table: tableName,
        error: error,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      message: "Critcal error while getting entities",
      error: error,
    });
  }
});

/**
 * UPDATE CONTROLLER
 */
router.put("/:tableName", async (req, res, next) => {
  try {
    const { tableName }: any = req.params;

    const newAttributes: string[] = Object.keys(req.body.new);
    const newValues: any = req.body.new;
    const filterAttributes: string[] = Object.keys(req.body.filter);
    const filterValues: any = req.body.filter;
    const queryValues: string[] = [];

    let query: string = `UPDATE ${tableName} SET `;

    for (let i = 0; i < newAttributes.length; i++) {
      newAttributes[i];
      if (i === newAttributes.length - 1) {
        query += `${newAttributes[i]} = $${i + 1}`;
        query += ` WHERE `;
      } else {
        query += `${newAttributes[i]} = $${i + 1}, `;
      }
      queryValues.push(newValues[newAttributes[i]]);
    }

    let j: number = newAttributes.length;

    for (let i = 0; i < filterAttributes.length; i++) {
      if (i === filterAttributes.length - 1) {
        query += `${filterAttributes[i]} = $${i + 1 + j}`;
      } else {
        query += `${filterAttributes[i]} = $${i + 1 + j} AND `;
      }
      queryValues.push(filterValues[filterAttributes[i]]);
    }
    query += " RETURNING *";

    const client = await pool.connect();
    try {
      const data = await client.query(query, queryValues);
      res
        .status(201)
        .json({ message: "Entity updated", table: tableName, data: data.rows });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating an entity",
        table: tableName,
        data: req.body,
        error: error,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      message: "Critical error while updating an entity",
      data: req.body,
      error: error,
    });
  }
});

/**
 * DELETE CONTROLLER
 */
router.delete("/:tableName", async (req, res, next) => {
  try {
    const { tableName }: any = req.params;
    const attributes: string[] = Object.keys(req.body);
    const values: any = req.body;

    let query: string = `DELETE FROM ${tableName} WHERE `;
    let queryValues: string[] = [];
    for (let i = 0; i < attributes.length; i++) {
      if (i === attributes.length - 1) {
        query += `${attributes[i]} = $${i + 1}`;
      } else {
        query += `${attributes[i]} = $${i + 1} AND `;
      }
      queryValues.push(values[attributes[i]]);
    }

    const client = await pool.connect();
    try {
      await client.query(query, queryValues);
      res
        .status(200)
        .json({ message: "Entity deleted", table: tableName, data: req.body });
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting an entity",
        table: tableName,
        data: req.body,
        error: error,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({
      message: "Critical error while deleting an entity",
      data: req.body,
      error: error,
    });
  }
});

export default router;
