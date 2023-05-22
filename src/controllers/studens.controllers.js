import bcryptjs from "bcryptjs";
import { pool } from "../config/db.js";
import { json } from "express";

export const getStudens = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT DISTINCT s.id, s.last_name, p.nombre, p.materia, n.nota, n.retroalimentacion FROM notas n RIGHT JOIN practica p ON n.id_practica = p.id RIGHT JOIN studens s ON n.id_student = s.id;"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getStuden = async (req, res) => {
  try {
    if (req.params.id === "listStudens") {
      const [rows] = await pool.query("SELECT * FROM studens");
      res.json(rows);
    } else {
      const [rows] = await pool.query(
        "SELECT p.id,p.nombre,p.materia,n.informe,n.nota,n.retroalimentacion FROM notas n JOIN practica p on n.id_practica =p.id WHERE n.id_student = ?",
        [req.params.id]
      );

      return res.status(200).json(rows);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteStuden = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM studens WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Studen not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createStuden = async (req, res) => {
  try {
    const { last_Name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 8);
    const [result] = await pool.query(
      "INSERT INTO studens (last_name,email,password) VALUES (?,?,?)",
      [last_Name, email, hashedPassword]
    );
    res.status(201).json({ message: "studen create successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong :" + error });
  }
};

export const updateStuden = async (req, res) => {
  try {
    const { id } = req.params;
    const { retro, nota, informe, practId } = req.body;
    if (informe) {
      const [result] = await pool.query(
        "UPDATE notas SET informe = ?   WHERE id_student = ?",
        [informe, id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Studen not found" });

      const [rows] = await pool.query("SELECT * FROM studens WHERE id = ?", [
        id,
      ]);

      return res.status(200).json(rows[0]);
    } else if (retro != "" && nota != "") {
      const [result] = await pool.query(
        "UPDATE notas SET nota=?,retroalimentacion= ? WHERE id_practica = ? AND id_student = ?",
        [nota, retro, practId, id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Studen not found" });

      const [rows] = await pool.query("SELECT * FROM studens WHERE id = ?", [
        id,
      ]);

      return res.status(200).json(rows[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
