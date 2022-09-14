import {Router} from "express";

import CommentsController from "../Controllers/commentsController.js";

const router = new Router();

router.route("/addComment").post(CommentsController.apiPostComment);
router.route("/commentReport").get(CommentsController.apiCommentReport);
router.route("/userComments/:email").get(CommentsController.apiGetComments);
router.route("/allComments").get(CommentsController.apiGetAllComments);

export default router;
