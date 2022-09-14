import UsersDAO from "../../DAO/usersDAO.js";
import FlightsDAO from "../../DAO/flightsDAO.js";
import {User} from "./usersController.js";
import CommentsDAO from "../../DAO/commentsDAO.js";
import {ObjectId} from "bson";

export default class CommentsController {
  static async apiPostComment(req, res, next) {
    try {
      const {user_id} = req.body;
      const loggedUser = await UsersDAO.getUserSession(user_id);

      const userJwt = loggedUser.jwt;
      const userObj = await User.decoded(userJwt);
      var {error} = userObj;

      const flight_id = req.body.flight_id;
      const comment = req.body.comment;
      const rate = req.body.rate;
      const date = new Date();

      const commentResponse = await CommentsDAO.addComment(
        flight_id,
        user_id,
        comment,
        date,
        rate
      );

      const updateComments = await FlightsDAO.getFlightByID(flight_id);

      if (updateComments) {
        let result = await CommentsDAO.addCommentToFlight(
          flight_id,
          user_id,
          comment,
          date,
          rate
        );
        res.json(result);
        return;
      }

      res.json({status: "success", comments: updateComments.comments});
    } catch (error) {
      res.status(401).json({error});
      return;
    }
  }

  static async apiCommentReport(req, res, next) {
    try {
      const {user_id} = req.body;

      const loggedUser = await UsersDAO.getUserSession(user_id);
      const userJwt = loggedUser.jwt;
      const userObj = await User.decoded(userJwt);
      var {error} = userObj;

      if (UsersDAO.checkAdmin(user_id)) {
        const report = await CommentsDAO.TopUsersComments();
        res.json({report});
        return;
      }
      res.status(400).json({error: "cannot get comments"});
    } catch (error) {
      res.status(500).json({error});
    }
  }

  static async apiGetComments(req, res, next) {
    try {
      const {email} = req.params;

      let report = await CommentsDAO.getCommentsByEmail({email});
      res.json(report);
      return;
    } catch (error) {
      res.status(500).json({error});
    }
  }

  static async apiGetAllComments(req, res) {
    try {
      let all = await CommentsDAO.getAllComments();
      res.json(all);
      return;
    } catch (error) {
      res.status(500).json({error});
    }
  }
}
