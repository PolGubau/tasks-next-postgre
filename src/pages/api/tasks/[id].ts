import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

export default async function tasks(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  const { id } = query;

  //
  switch (method) {
    case "GET":
      try {
        const query = `SELECT * FROM tasks WHERE id = $1`;
        const values = [id];

        const result = await conn.query(query, values);

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "not found" });
        }
        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    //
    case "PUT":
      try {
        const {title,description,status}=body
        const query = `UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *`;
        const values = [title,description,status,id];
        const result = await conn.query(query, values);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: "not found" });
        }
        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    //
    case "DELETE":
      try {
        const query = `DELETE FROM tasks WHERE id = $1 RETURNING *`;
        const values = [id];

        const response = await conn.query(query, values);
        return res.json(response);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    //
    default:
      return res.status(404).json({ error: "not found" });
  }
}
