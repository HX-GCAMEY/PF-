import UsersDAO from "../../DAO/usersDAO";
import bcrypt from "bcryptjs";
import jwt from "jasonwebtoken";

const hashPassword = async (password) => await bcrypt.hash(password, 10);

export class User {
  constructor({email, password, profile = {}} = {}) {
    this.email = email;
    this.password = password;
    this.profile = profile;
  }
  toJson() {
    return {email: this.email, profile: this.profile};
  }
  async comparePassword(plainText) {
    return await bcrypt.compare(plainText, this.password);
  }
}
