import {Router} from "express";
import FlightsControler from "../Controllers/fligthController.js";

const router = new Router();

router.route("/");
router.route("/search").get(FlightsControler.apiGetFlightsByRoute);
router.route("/flights").get(FlightsControler.apiGetFlights);

export default router;
