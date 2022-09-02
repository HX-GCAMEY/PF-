import {Router} from "express";
import UsersController from "../Controllers/usersController.js";

const router = new Router();

router.route("/register").post(UsersController.register);
router.route("/login").post(UsersController.login);
router.route("/logout").post(UsersController.logout);
router.route("/delete").delete(UsersController.delete);
router.route("/updateProfile").put(UsersController.save);
router.route("/makeAdmin");

export default router;
