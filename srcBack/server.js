import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import flights from "./api/Routes/flightRoutes.js";
import users from "./api/Routes/usersRoutes.js";
import tickets from "./api/Routes/ticketsRouter.js";
import comments from "./api/Routes/commentsRoutes.js";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname);
  },
});

app.use(cors());
process.env.NODE_ENV === "prod" && app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage}).single("image"));
app.use("/", flights);
app.use("/api/flights", flights);
app.use("/api/comments", comments);
app.use("/api/users", users);
app.use("/api/tickets", tickets);

app.use("*", (req, res) => res.status(404).json({error: "not found"}));

export default app;
