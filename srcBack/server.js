import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import flights from "./api/Routes/flightRoutes.js";
import users from "./api/Routes/usersRoutes.js";
import tickets from "./api/Routes/ticketsRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
process.env.NODE_ENV === "prod" && app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use("/");
app.use("/api/flights", flights);
app.use("/api/users", users);
app.use("/api/tickets", tickets);
app.use("/", express.static("build"));

app.use("*", (req, res) => res.status(404).json({error: "not found"}));

export default app;
