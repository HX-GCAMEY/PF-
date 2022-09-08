import {Router} from "express";
import TicketsController from "../Controllers/ticketsController.js";

const router = new Router();

router.route("/purchase").post(TicketsController.purchase);
//router.route("/cancel").delete(TicketsController.cancel);
// ruta pare enviar ticket por email
//router.route("/send").get(TicketsController.send);

export default router;
