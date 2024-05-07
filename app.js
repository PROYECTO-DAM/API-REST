const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();


let userRouter = require("./routing/userRoutes");
let fichajeRouter = require("./routing/fichajeRoutes");
let nominaRouter = require("./routing/nominaRoutes");
let proyectoRouter = require("./routing/proyectoRoutes");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/fichajes", fichajeRouter);
app.use("/api/v1/nominas", nominaRouter);
app.use("/api/v1/proyecto", proyectoRouter);



app.listen(8081, () => {});