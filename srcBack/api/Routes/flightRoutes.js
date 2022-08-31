const Router = require("express");

const router = new Router();

router.route("/");
router.route("/search");
router.route("/flights");

module.exports = router;
