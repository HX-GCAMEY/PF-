import {Router} from "express";
import TicketsController from "../Controllers/ticketsController.js";

const router = new Router();

router.route("/purchase").put(TicketsController.purchase);
router.route("/cancel").put(TicketsController.cancel);
router.route("/send").get(TicketsController.send);
// ruta pare enviar ticket por email

export default router;
