import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  //

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM tasks";
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error:any) {
        return res.status(400).json({ error: error.message });
      }
      
      
      
    case "POST":
      try {
        const { title, description, status } = body;
        const queryGET =
          "INSERT INTO tasks(title,description,status) VALUES($1,$2,$3) RETURNING *";
        const values = [title, description, status];
        const responsePOST = await conn.query(queryGET, values);

        return res.status(200).json(responsePOST);
      } catch (error:any) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(404).json({ error: "not found" });
  }
}
