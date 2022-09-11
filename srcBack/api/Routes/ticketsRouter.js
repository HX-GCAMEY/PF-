import {Router} from "express";
import TicketsController from "../Controllers/ticketsController.js";

const router = new Router();

router.route("/purchase").put(TicketsController.purchase);
router.route("/cancel").put(TicketsController.cancel);
// ruta pare enviar ticket por email
//router.route("/send").get(TicketsController.send);

export default router;
