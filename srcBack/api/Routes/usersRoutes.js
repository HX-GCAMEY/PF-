import {Router} from "express";
import UsersController from "../Controllers/usersController.js";

const router = new Router();

router.route("/register").post(UsersController.register);
router.route("/googleRegister").post(UsersController.googleRegister);
router.route("/login").post(UsersController.login);
router.route("/logout").post(UsersController.logout);
router.route("/delete").post(UsersController.delete);
router.route("/updateProfile").put(UsersController.save);
router.route("/findUser/:email").get(UsersController.findUser);

// ADMIN ROUTES
router.route("/registerAdmin").post(UsersController.registerAdmin);
router.route("/makeAdmin").put(UsersController.createAdminUser);
router.route("/demoteAdmin").put(UsersController.demoteAdmin);
router.route("/banUser").put(UsersController.banUser);
router.route("/restore").put(UsersController.userRestore);
router.route("/adminLogin").post(UsersController.adminLogin);
router.route("/all").get(UsersController.getAllUsers);
export default router;
