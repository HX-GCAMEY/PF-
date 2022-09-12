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
        isAdmin: false,
        isBanned: false,
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
      const admin = await this.checkAdmin(email);

      await session.updateOne(
        {user_id: email},
        {$set: {jwt: jwt, isAdmin: admin}},
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

  static async getUserSession(email) {
    try {
      return session.findOne({user_id: email});
    } catch (error) {
      console.error(`Error occurred while retrieving user session, ${error}`);
      return null;
    }
  }

  static async deleteUser(email) {
    try {
      await users.deleteOne({email});
      await session.deleteOne({user_id: email});
      if (!(await this.getUser(email)) && !(await this.getUserSession(email))) {
        return {succes: true};
      } else {
        console.error(`${email} could not be deleted`);
        return {error: `${email} could not be deleted`};
      }
    } catch (error) {
      console.error(`An error ocurred while deleting user, ${error}`);
      return {error: error};
    }
  }

  static async checkAdmin(email) {
    try {
      const {isAdmin} = await this.getUser(email);
      return isAdmin || false;
    } catch (e) {
      return {error: e};
    }
  }

  static async banUser(email) {
    try {
      const banResponse = await users.updateOne(
        {email},
        {$set: {isBanned: true}}
      );
      if (banResponse) return {success: true};
    } catch (error) {
      return {error: error};
    }
  }

  static async makeAdmin(email) {
    try {
      const updateResponse = users.updateOne({email}, {$set: {isAdmin: true}});
      if (updateResponse.matchedCount === 0) {
        return {error: "No user found with that email"};
      }
      return {success: true};
    } catch (e) {
      return {error: e};
    }
  }
}
