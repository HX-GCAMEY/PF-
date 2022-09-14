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

  static async addAdmin(userInfo) {
    try {
      await users.insertOne({
        email: userInfo.email,
        password: userInfo.password,
        isAdmin: true,
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
      const banned = await this.checkBanned(email);

      if (banned) {
        return {error: "Your account is banned"};
      }

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

  static async profilePic(email, image) {
    try {
      const addPicResponse = await users.updateOne({email}, {$set: {image}});
      if (addPicResponse.matchedCount === 0) {
        return {error: "No user found with that email"};
      }
      return addPicResponse;
    } catch (error) {
      console.error(`An error occurred while uploading, ${error}`);
      return {error: error};
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

  static async checkBanned(email) {
    try {
      const {isBanned} = await this.getUser(email);
      return isBanned || false;
    } catch (e) {
      return {error: e};
    }
  }

  static async banUser(email) {
    try {
      const banResponse = await users.updateOne(
        {email},
        {$set: {isBanned: true, isAdmin: false}}
      );
      if (banResponse) return {success: true};
    } catch (error) {
      return {error: error};
    }
  }

  static async userRestore(email) {
    try {
      const restoreResponse = await users.updateOne(
        {email},
        {$set: {isBanned: false}}
      );
      if (restoreResponse) return {success: true};
    } catch (error) {
      return {error: error};
    }
  }

  static async makeAdmin(email) {
    try {
      const updateResponse = users.updateOne(
        {email},
        {$set: {isAdmin: true, isBanned: false}}
      );
      if (updateResponse.matchedCount === 0) {
        return {error: "No user found with that email"};
      }
      return {success: true};
    } catch (e) {
      return {error: e};
    }
  }

  static async demoteAdmin(email) {
    try {
      const updateResponse = users.updateOne(
        {email},
        {$set: {isAdmin: false, isBanned: false}}
      );
      if (updateResponse.matchedCount === 0) {
        return {error: "No user found with that email"};
      }
      return {success: true};
    } catch (e) {
      return {error: e};
    }
  }

  static async getUsers() {
    let queryParams = {};
    let {query = {}, project = {}} = queryParams;
    let cursor;
    try {
      cursor = await users.find(query).project(project);
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`);
      return [];
    }

    const displayCursor = cursor.limit(0);

    try {
      const usersList = await displayCursor.toArray();
      return usersList;
    } catch (error) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${error}`
      );
      return [];
    }
  }
}
