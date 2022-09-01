import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import flights from "../srcBack/api/Routes/flightRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
process.env.NODE_ENV !== "prod" && app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", flights);

export default app;
