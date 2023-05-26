import { Router } from "express";
import bcryptjs from "bcryptjs";
import axios from "axios";

import studensRouter from "./studens.routes.js";
import teacherRouter from "./teacher.routes.js";
import managerRouter from "./manager.routes.js";
import PractisRouter from "./practis.routes.js";
import { pool } from "../config/db.js";

const router = Router();
const prefix = "/api";

router.get("/", (req, res) => {
  if (req.session.userId) {
    switch (req.session.rol) {
      case "studens":
        res.redirect("studens");
        break;
      case "teachers":
        res.redirect("teachers");
        break;
      case "manager":
        res.redirect("manager");
        break;
    }
  } else {
    const data = {
      title: "Login",
    };
    res.render("index", data);
  }
});

router.get("/register", (req, res) => {
  const data = {
    title: "Register",
  };
  res.render("register", data);
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query(
      "SELECT 'studens' AS table_name, id,last_name,email,password FROM studens WHERE email = ? UNION SELECT 'teachers' AS table_name, id,last_name,email,password FROM teachers WHERE email = ? UNION SELECT 'manager' AS table_name, id, last_name, email, password FROM manager WHERE email = ? ",
      [username, username, username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    bcryptjs.compare(password, rows[0].password, (error, isMatch) => {
      if (error) {
        console.error("Error the compare passwords:", error);
        return;
      }
      if (isMatch) {
        if (rows[0].table_name == "studens") {
          req.session.userId = rows[0].id;
          req.session.username = rows[0].last_name;
          req.session.rol = rows[0].table_name;
          axios
            .post(
              "https://www.google.com/recaptcha/api/siteverify?secret=6LfMWj4mAAAAAEquljn9YK93BJv9eM11kPixgl95&response=" +
                req.body["g-recaptcha-response"]
            )
            .then((response) => {
              const data = response.data;
              if (data.success) {
                res.redirect("studens");
              } else {
                return res.status(400).json({ message: "Captcha Invalid" });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (rows[0].table_name == "teachers") {
          req.session.userId = rows[0].id;
          req.session.username = rows[0].last_name;
          req.session.rol = rows[0].table_name;
          axios
            .post(
              "https://www.google.com/recaptcha/api/siteverify?secret=6LfMWj4mAAAAAEquljn9YK93BJv9eM11kPixgl95&response=" +
                req.body["g-recaptcha-response"]
            )
            .then((response) => {
              const data = response.data;
              if (data.success) {
                res.redirect("teachers");
              } else {
                return res.status(400).json({ message: "Captcha Invalid" });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          req.session.userId = rows[0].id;
          req.session.username = rows[0].last_name;
          req.session.rol = rows[0].table_name;
          axios
            .post(
              "https://www.google.com/recaptcha/api/siteverify?secret=6LfMWj4mAAAAAEquljn9YK93BJv9eM11kPixgl95&response=" +
                req.body["g-recaptcha-response"]
            )
            .then((response) => {
              const data = response.data;
              if (data.success) {
                res.redirect("manager");
              } else {
                return res.status(400).json({ message: "Captcha Invalid" });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        return res.status(400).json({ message: "Password Invalid" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong, " + error });
  }
});

router.get("/studens", (req, res) => {
  if (req.session.rol === "studens") {
    const data = {
      title: "Studens",
      name_view: "Menu Principal",
      session: req.session,
    };
    res.render("studens", data);
  } else {
    res.redirect("/");
  }
});

router.get("/teachers", (req, res) => {
  if (req.session.rol === "teachers") {
    const data = {
      title: "Teachers",
      name_view: "Menu Principal",
      session: req.session,
    };
    res.render("teachers", data);
  } else {
    res.redirect("/");
  }
});

router.get("/manager", (req, res) => {
  if (req.session.rol === "manager") {
    const data = {
      title: "Manager",
      name_view: "Administrador",
      session: req.session,
    };
    res.render("manager", data);
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return;
    }
    res.redirect("/");
  });
});

router.get("/retro-notas", (req, res) => {
  if (req.session.rol === "teachers") {
    const data = {
      title: "Teachers",
      name_view: "Retroalimentacion y Notas",
      session: req.session,
    };
    res.render("retroNotas", data);
  } else {
    res.redirect("/");
  }
});

router.get("/editText", (req, res) => {
  if (req.session.rol === "studens") {
    const data = {
      title: "Studens",
      name_view: "Editor de Texto",
      session: req.session,
    };
    res.render("editText", data);
  } else {
    res.redirect("/");
  }
});

router.get("/terminal", (req, res) => {
  if (req.session.rol === "studens") {
    const data = {
      title: "Studens",
      name_view: "Terminal",
      session: req.session,
    };
    res.render("terminal", data);
  } else {
    res.redirect("/");
  }
});

router.get("/notaStudent", (req, res) => {
  if (req.session.rol === "studens") {
    const data = {
      title: "Studens",
      name_view: "Terminal",
      session: req.session,
    };
    res.render("notaStudent", data);
  } else {
    res.redirect("/");
  }
});

router.get("/notasStudents", (req, res) => {
  if (req.session.rol === "teachers") {
    const data = {
      title: "Teachers",
      name_view: "Notas",
      session: req.session,
    };
    res.render("notasStudents", data);
  } else {
    res.redirect("/");
  }
});

router.get("/uploadPrac", (req, res) => {
  if (req.session.rol === "teachers") {
    const data = {
      title: "Teachers",
      name_view: "Upload Practis",
      session: req.session,
    };
    res.render("uploadPrac", data);
  } else {
    res.redirect("/");
  }
});

router.use(`${prefix}/studens`, studensRouter);
router.use(`${prefix}/teachers`, teacherRouter);
router.use(`${prefix}/manager`, managerRouter);
router.use(`${prefix}/practis`, PractisRouter);

export default router;
