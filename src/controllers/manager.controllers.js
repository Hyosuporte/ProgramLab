import { pool } from "../config/db.js";

export const getManagers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM manager");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getManager = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM manager WHERE id = ?", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM manager WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createManager = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query("INSERT INTO manager () VALUES (?, ?)", [
      name,
      salary,
    ]);
    res.status(201).json({});
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
    const {} = req.body;

    const [result] = await pool.query("UPDATE manager SET  WHERE id = ?", []);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Manager not found" });

    const [rows] = await pool.query("SELECT * FROM Manager WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
