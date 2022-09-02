let users;
let session;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users && session) {
      return;
    }
    try {
      users = await conn.db(process.env.FLYMATE_NS).collection("users");
      session = await conn.db(process.env.FLYMATE_NS).collection("session");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async getUser(email) {
    return await users.findOne({email: email});
  }

  static async addUser(userInfo) {
    try {
      await users.insertOne({
        email: userInfo.email,
        password: userInfo.password,
      });
      return {succes: true};
    } catch (error) {
      if (String(error).startsWith("MongoError: E11000 duplicate key error")) {
        return {error: "A user with the given email already exists."};
      }
      console.error(`Error occurred while adding new user, ${error}.`);
      return {error: error};
    }
  }

  static async loginUser(email, jwt) {
    try {
      await session.updateOne(
        {user_id: email},
        {$set: {jwt: jwt}},
        {upsert: true}
      );
      return {success: true};
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`);
      return {error: e};
    }
  }
  static async updateProfile(email, profile) {
    try {
      profile = profile || {};
      const updateResponse = await users.updateOne({email}, {$set: {profile}});
      if (updateResponse.matchedCount === 0) {
        return {error: "No user found with that email"};
      }
      return updateResponse;
    } catch (error) {
      console.error(
        `An error occurred while updating this user's preferences, ${error}`
      );
      return {error: error};
    }
  }

  static async logoutUser(email) {
    try {
      await session.deleteOne({user_id: email});
      return {success: true};
    } catch (e) {
      console.error(`Error occurred while logging out user, ${e}`);
      return {error: e};
    }
  }
}
