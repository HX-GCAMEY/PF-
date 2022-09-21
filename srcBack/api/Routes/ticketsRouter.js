import {Router} from "express";
import TicketsController from "../Controllers/ticketsController.js";

const router = new Router();

router.route("/purchase").put(TicketsController.purchase);
router.route("/cancel").put(TicketsController.cancel);
router.route("/send/:email").get(TicketsController.send);
router.route("/allTickets").get(TicketsController.allTickets);
router.route("/createPackage").post(TicketsController.createPackage);
router.route("/allPackages").get(TicketsController.getPackages);
router.route("/packageCode/:code").get(TicketsController.apiGetPackageByCode);
// ruta pare enviar ticket por email

export default router;
