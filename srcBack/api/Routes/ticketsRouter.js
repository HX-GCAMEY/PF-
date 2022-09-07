import {Router} from "express";
import TicketsController from "../Controllers/ticketsController.js";

const router = new Router();

router.route("/purchase");
router.route("/cancel");
router.route("/updateTicket");
// ruta pare enviar ticket por email
router.route("/sendTicket");

export default router;
