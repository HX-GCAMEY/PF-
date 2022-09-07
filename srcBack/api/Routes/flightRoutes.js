import {Router} from "express";

import FlightsControler from "../Controllers/fligthController.js";

const router = new Router();

router.route("/").get(FlightsControler.apiGetFlightsPage);
router.route("/search").get(FlightsControler.apiGetFlightsByRoute);
router.route("/flights").get(FlightsControler.apiGetFlights);
router.route("/cities").get(FlightsControler.apiGetCities);

export default router;