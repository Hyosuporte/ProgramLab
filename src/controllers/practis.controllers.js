import { pool } from "../config/db.js";

export const createPractis = async (req, res) => {
  try {
    const { name, materia, practiText } = req.body;
    const [result] = await pool.query(
      "INSERT INTO practica(nombre,materia,pdf) VALUES (?,?,?)",
      [name, materia, practiText]
    );
    return res.status(200).json({ message: "practice created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong :" + error });
  }
};
