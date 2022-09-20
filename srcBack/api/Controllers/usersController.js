import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsersDAO from "../../DAO/usersDAO.js";
import cloudinary from "cloudinary";
import fs from "fs-extra";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// USER PASSWORD ENCRYPT
const hashPassword = async (password) => await bcrypt.hash(password, 10);

export class User {
  constructor({email, password = {}} = {}) {
    this.email = email;
    this.password = password;
  }
  toJson() {
    return {email: this.email};
  }
  // USER PASSWORD VERIFICATION (ENCRYPTED)
  async comparePassword(plainText) {
    return await bcrypt.compare(plainText, this.password);
  }

  // TRANSFORM USER PASSWORD TO JWT
  encoded() {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
        ...this.toJson(),
      },
      process.env.SECRET_KEY
    );
  }

  // TRANSFORM FROM JWT TO TEXT

  static async decoded(userJwt) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
      if (error) {
        return {error};
      }
      return new User(res);
    });
  }
}

export default class UserController {
  // NEW USER CREATION
  static async register(req, res) {
    try {
      const userFromBody = req.body;

      let errors = {};
      if (userFromBody && userFromBody.password.length < 8) {
        errors.password = "Your password must be at least 8 characters.";
      }

      if (!userFromBody.email || typeof userFromBody.email !== "string") {
        res.status(400).json({error: "Bad email format, expected string."});
        return;
      }

      if (await UsersDAO.getUser(userFromBody.email)) {
        errors.email = `${userFromBody.email} already exists`;
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
        return;
      }

      const userInfo = {
        ...userFromBody,
        password: await hashPassword(userFromBody.password),
      };

      const insertResult = await UsersDAO.addUser(userInfo);
      if (!insertResult.success) {
        errors.email = insertResult.error;
      }

      const userFromDB = await UsersDAO.getUser(userFromBody.email);
      if (!userFromDB) {
        errors.general = "Internal error, please try again later";
      }

      const user = new User(userFromDB);

      res.json({
        auth_token: user.encoded(),
        info: user.toJson(),
      });
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  //Register an google account
  static async googleRegister(req, res) {
    try {
      const {email} = req.body;
      let errors = {};

      if (!email || typeof email !== "string") {
        res.status(400).json({error: "Bad email format, expected string."});
        return;
      }

      if (await UsersDAO.getUser(email)) {
        errors.email = `${email} already exists`;
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
        return;
      }

      const userPassword = email + ".fromGoogle";

      const newUser = {
        email: email,
        password: await hashPassword(userPassword),
      };

      const registerResult = await UsersDAO.addUserFromGoogle(newUser);

      if (!registerResult.success) {
        errors.email = registerResult.error;
      }

      const userFromDB = await UsersDAO.getUser(email);
      if (!userFromDB) {
        errors.general = "Internal error, please try again later";
      }

      res.status(200).json(userFromDB);
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  // USER FIND IN DB

  static async findUser(req, res, next) {
    try {
      const {email} = req.params;
      let userData = await UsersDAO.getUser(email);

      if (!userData) {
        res.status(404).json({error: "User not found"});
        return;
      }
      res.status(200).json(userData);
      return;
    } catch (error) {
      res.status(500).json({error: error});
    }
  }

  //  USERS LOGGIN / ADD USER TO SESSIONS COLLECTION

  static async googleLogin(req, res, next) {
    try {
      const {email} = req.body;

      if (!email || typeof email !== "string") {
        res.status(400).json({error: "Bad email format, expected string."});
        return;
      }

      let userData = await UsersDAO.getUser(email);
      if (!userData) {
        res.status(401).json({error: "Make sure your email is correct."});
        return;
      }
      const user = new User(userData);

      const loginResponse = await UsersDAO.loginUser(
        user.email,
        user.encoded()
      );
      if (!loginResponse.success) {
        res.status(500).json({error: loginResponse.error});
        return;
      }
      res.json({auth_token: user.encoded(), info: user.toJson()});
    } catch (error) {}
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body;
      if (!email || typeof email !== "string") {
        res.status(400).json({error: "Bad email format, expected string."});
        return;
      }
      if (!password || typeof password !== "string") {
        res.status(400).json({error: "Bad password format, expected string."});
        return;
      }
      let userData = await UsersDAO.getUser(email);
      if (!userData) {
        res.status(401).json({error: "Make sure your email is correct."});
        return;
      }
      const user = new User(userData);

      if (!(await user.comparePassword(password))) {
        res.status(401).json({error: "Make sure your password is correct."});
        return;
      }

      const loginResponse = await UsersDAO.loginUser(
        user.email,
        user.encoded()
      );
      if (!loginResponse.success) {
        res.status(500).json({error: loginResponse.error});
        return;
      }
      res.json({auth_token: user.encoded(), info: user.toJson()});
    } catch (e) {
      res.status(400).json({error: e});
      return;
    }
  }

  // USER LOGOUT / DELETION FROM SESSION COLLECTION

  static async logout(req, res) {
    try {
      const {user} = req.body;
      const loggedUser = await UsersDAO.getUserSession(user);
      const userJwt = loggedUser.jwt;
      const userObj = await User.decoded(userJwt);
      var {error} = userObj;
      if (error) {
        res.status(401).json({error});
        return;
      }
      const logoutResult = await UsersDAO.logoutUser(userObj.email);
      var {error} = logoutResult;
      if (error) {
        res.status(500).json({error});
        return;
      }
      res.json(logoutResult);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // USER DELETION FROM DB

  static async delete(req, res) {
    try {
      let {email} = req.body;

      // if (!password || typeof password !== "string") {
      //   res.status(400).json({error: "Bad password format, expected string."});
      //   return;
      // }

      // const user = new User(await UsersDAO.getUser(email));

      // if (!(await user.comparePassword(password))) {
      //   res.status(401).json({error: "Make sure your password is correct."});
      //   return;
      // }
      const deleteResult = await UsersDAO.deleteUser(email);
      var {error} = deleteResult;
      if (error) {
        res.status(500).json({error});
        return;
      }
      res.json(deleteResult);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // PROFILE PIC

  static async addImage(req, res) {
    try {
      const {email} = req.body;
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const image = {imageURL: result.url, image_id: result.public_id};
      await UsersDAO.profilePic(email, image);
      await fs.unlink(req.file.path);
      res.status(200).send("Image Uploaded");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getImage(req, res) {
    try {
      const {email} = req.params;
      const user = await UsersDAO.getUser(email);
      const profilePic = user.image.imageURL;
      res.status(200).json(profilePic);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // PROFILE UPDATE

  static async save(req, res) {
    try {
      await UsersDAO.updateProfile(req.body.email, req.body.profile);
      const userFromDB = await UsersDAO.getUser(req.body.email);
      const updatedUser = new User(userFromDB);

      res.json({
        auth_token: updatedUser.encoded(),
        info: updatedUser.toJson(),
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // CONTROL DE ADMINISTRADORES  (CREAR ADMIN)

  static async adminLogin(req, res) {
    try {
      const {email, password} = req.body;
      if (!email || typeof email !== "string") {
        res.status(400).send({error: "Bad email format, expected string."});
        return;
      }
      if (!password || typeof password !== "string") {
        res.status(400).send({error: "Bad password format, expected string."});
        return;
      }
      let userData = await UsersDAO.getUser(email);
      if (!userData) {
        res.status(401).send({error: "Make sure your email is correct."});
        return;
      }
      const user = new User(userData);

      if (!(await user.comparePassword(password))) {
        res.status(401).send({error: "Make sure your password is correct."});
        return;
      }

      if (!(await UsersDAO.checkAdmin(email))) {
        res.status(401).send({error: "Not authorized"});
        return;
      }

      const loginResponse = await UsersDAO.loginUser(
        user.email,
        user.encoded()
      );
      if (!loginResponse.success) {
        res.status(500).json({error: loginResponse.error});
        return;
      }
      res.json({auth_token: user.encoded(), info: user.toJson()});
    } catch (e) {
      res.status(400).json({error: e});
      return;
    }
  }

  static async createAdminUser(req, res) {
    try {
      const {email} = req.body;

      // const authorized = await UsersDAO.getUserSession(user);

      // console.log(authorized.isAdmin);
      // if (!authorized.isAdmin) {
      //   res.status(400).json({error: "You require authorization"});
      //   return;
      // }

      const adminCheck = await UsersDAO.checkAdmin(email);
      if (adminCheck) {
        res.json({error: "User is already an admin of this page"});
        return;
      }
      const newAdmin = await UsersDAO.makeAdmin(email);
      if (newAdmin) {
        res.json(newAdmin);
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async demoteAdmin(req, res) {
    try {
      const {email} = req.body;

      // const authorized = await UsersDAO.getUserSession(user);

      // console.log(authorized.isAdmin);
      // if (!authorized.isAdmin) {
      //   res.status(400).json({error: "You require authorization"});
      //   return;
      // }

      const adminCheck = await UsersDAO.checkAdmin(email);
      if (!adminCheck) {
        res.json({error: "Admin already demoted"});
        return;
      }
      const demotedAdmin = await UsersDAO.demoteAdmin(email);
      if (demotedAdmin) {
        res.json(demotedAdmin);
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // BANNEAR USUARIO
  static async banUser(req, res) {
    try {
      const {email} = req.body;

      // if (!user) {
      //   res.status(400).json({error: "Login from an Admin account"});
      //   return;
      // }

      // const authorized = await UsersDAO.getUserSession(user);

      // console.log(authorized.isAdmin);
      // if (!authorized.isAdmin) {
      //   res.status(400).json({error: "You require authorization"});
      //   return;
      // }

      const userFromDB = await UsersDAO.getUser(email);
      if (!userFromDB) {
        res.status(404).json({error: "User not found"});
        return;
      }

      const bannedUser = await UsersDAO.banUser(email);
      if (bannedUser) {
        res.json(bannedUser);
        return;
      }
    } catch (error) {
      res.status(500).json({error: error});
    }
  }

  static async userRestore(req, res) {
    try {
      const {email} = req.body;
      const userFromDB = await UsersDAO.getUser(email);
      if (!userFromDB) {
        res.status(404).json({error: "User not found"});
        return;
      }
      const restore = await UsersDAO.userRestore(email);
      if (restore) {
        res.json(restore);
        return;
      }
    } catch (error) {
      res.status(500).json({error: error});
    }
  }

  static async getAllUsers(req, res) {
    try {
      let allUsers = await UsersDAO.getUsers();
      if (!allUsers) {
        res.status(404).json({error: "There are not users"});
        return;
      }
      res.status(200).json(allUsers);
      return;
    } catch (error) {
      res.status(500).json({error: error});
    }
  }

  static async registerAdmin(req, res) {
    try {
      const userFromBody = req.body;

      let errors = {};
      if (userFromBody && userFromBody.password.length < 8) {
        errors.password = "Your password must be at least 8 characters.";
      }

      if (await UsersDAO.getUser(userFromBody.email)) {
        errors.email = `${userFromBody.email} already exists`;
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).send(errors);
        return;
      }

      const userInfo = {
        ...userFromBody,
        password: await hashPassword(userFromBody.password),
      };

      const insertResult = await UsersDAO.addAdmin(userInfo);
      if (!insertResult.success) {
        errors.email = insertResult.error;
      }

      const userFromDB = await UsersDAO.getUser(userFromBody.email);
      if (!userFromDB) {
        errors.general = "Internal error, please try again later";
      }

      const user = new User(userFromDB);

      res.json({
        auth_token: user.encoded(),
        info: user.toJson(),
      });
    } catch (e) {
      res.status(500).json({error: e});
    }
  }

  static async saveFavs(req, res){
    try{
      const {email, favorites} = req.body;
      let resp = await UsersDAO.saveFavsInDB(email, favorites);
      res.status(200).json(resp);
    }catch(e){
      res.status(500).json({error: e});
    }
  }

  static async getFavs(req, res){
    try{
      const {email} = req.params;
      let resp = await UsersDAO.findFavsByEmail(email);
      res.status(200).json(resp[0].favorites);
    }catch(e){
      res.status(500).json({error: e});
    }
  }
}
