import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import session from "express-session";
import indexRouter from "./routes/index.routes.js";
import { PORT } from "./config/config.js";

const app = express();
app.use(
  session({
    secret: "programLabs",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`Se esta corriedo el servidor en el puerto:  ${PORT}`);
});
