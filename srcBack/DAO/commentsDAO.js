import {ObjectId} from "bson";

let comments;
let flights;

export default class CommentsDAO {
  static async injectDB(conn) {
    if (comments && flights) {
      return;
    }
    try {
      comments = await conn.db(process.env.FLYMATE_NS).collection("comments");
      flights = await conn.db(process.env.FLYMATE_NS).collection("flights");
    } catch (error) {
      console.error(
        `Unable to establish collection handles in usersDAO ${error}`
      );
    }
  }

  static async addComment(flight_id, user_id, comment, date, rate = 3) {
    try {
      const commentDoc = {
        email: user_id,
        text: comment,
        date: date,
        flight_id: flight_id,
        rate: rate,
      };
      return await comments.insertOne(commentDoc);
    } catch (error) {
      console.error(`Unable to post comment: ${error}`);
      return {error: error};
    }
  }

  static async addCommentToFlight(flight_id, user_id, comment, date, rate) {
    try {
      await flights.updateOne(
        {_id: ObjectId(flight_id)},
        {
          $addToSet: {
            comments: {
              _id: ObjectId(Math.random(1) * 1000000000)
                .toString()
                .replace(/[^0-9]/g, ""),
              user_id: user_id,
              comment: comment,
              date: date,
              rate: rate,
            },
          },
        },
        {
          upsert: true,
        }
      );
      return {succes: true};
    } catch (error) {
      console.error(`Error occurred while adding your comment, ${error}.`);
      return {error: error};
    }
  }

  static async getCommentsByEmail(email) {
    try {
      const pipeline = [
        {
          $match: {
            email: email.email,
          },
        },
        {
          $project: {
            email: 1,
            text: 1,
            flight_id: 1,
            rate: 1,
          },
        },
      ];
      return await comments.aggregate(pipeline).toArray();
    } catch (error) {
      console.error(`Error occurred while retrieving comments, ${error}`);
      return null;
    }
  }

  static async getAllComments() {
    try {
      return await comments.find().toArray();
    } catch (error) {
      console.error(`Error occurred while retrieving comments, ${error}`);
      return null;
    }
  }

  static async TopUsersComments() {
    try {
      const pipeline = [
        {
          $group: {
            _id: "$email",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 20,
        },
      ];

      const result = await comments.aggregate(pipeline);

      return await result.toArray();
    } catch (error) {
      console.error(`Unable to retrieve most active commenters: ${error}`);
      return {error: error};
    }
  }
}
