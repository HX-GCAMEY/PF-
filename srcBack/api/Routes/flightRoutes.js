const Router = require("express");

const {default: FlightsControler} = require("../Controllers/fligthController");

const router = new Router();

router.route("/");
router.route("/search").get(FlightsControler.apiGetFlightsByRoute);
router.route("/flights").get(FlightsControler.apiGetFlights);


module.exports = router;
