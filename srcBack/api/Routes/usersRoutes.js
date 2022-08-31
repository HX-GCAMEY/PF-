const Router = require("express");

const router = new Router();

router.route("/register").get();
router.route("/login");
router.route("/logout");
router.route("/delete");
router.route("/updateProfile");
router.route("/makeAdmin");

module.exports = router;
