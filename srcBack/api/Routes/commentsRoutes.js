import {Router} from "express";
import CommentsController from "../Controllers/commentsController.js";

const router = new Router();

// /addComment: ENVIAR POR BODY {user_id:EMAIL,flight_id:EL ID DEL VUELO,comment:COMENTARIO,rate:NUMERO 1 a 5}

// /commentReport: NO REQUIERE INFO

// /userComments/:email : ENVIAR SOLO EMAIL POR PARAMS

// /allComments: NO REQUIRE INFO

router.route("/addComment").post(CommentsController.apiPostComment);
router.route("/commentReport").get(CommentsController.apiCommentReport);
router.route("/userComments/:email").get(CommentsController.apiGetComments);
router.route("/allComments").get(CommentsController.apiGetAllComments);

export default router;
