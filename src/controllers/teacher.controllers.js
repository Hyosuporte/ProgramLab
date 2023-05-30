import bcryptjs from "bcryptjs";
import { pool } from "../config/db.js";

export const getTeachers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM teachers");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM teachers WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Teachers not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { last_Name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 8);
    const [result] = await pool.query(
      "INSERT INTO teachers (last_name,email,password) VALUES (?,?,?)",
      [last_Name, email, hashedPassword]
    );
    res.status(201).json({ message: "teacher create successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong :" + error });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { last_Name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 8);
    const [result] = await pool.query(
      "UPDATE teachers SET last_name=?,email=?,password=? WHERE id=?",
      [last_Name, email, hashedPassword, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Teachers not found" });

    const [rows] = await pool.query("SELECT * FROM Teachers WHERE id = ?", [
      id,
    ]);

    return res.status(200).json({ message: "profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
