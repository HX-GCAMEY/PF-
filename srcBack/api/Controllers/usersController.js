import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsersDAO from "../../DAO/usersDAO.js";

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

  // USER FIND IN DB

  static async findUser(req, res, next) {
    console.log(req.body);
    try {
      const {email} = req.body;
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
      let {password, email} = req.body;

      // if (!password || typeof password !== "string") {
      //   res.status(400).json({error: "Bad password format, expected string."});
      //   return;
      // }

      const user = new User(await UsersDAO.getUser(email));

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
      const {email, user} = req.body;

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

  // BANNEAR USUARIO
  static async banUser(req, res) {
    try {
      const {email, user} = req.body;

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
<<<<<<< Updated upstream
=======

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
>>>>>>> Stashed changes
}
