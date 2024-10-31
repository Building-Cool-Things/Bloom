import showError from "../../utils/showError";
import UserModel, { UserType } from "../models/User";

class User {
  async checkUser(email: string) {
    try {
      const isUserFound = await UserModel.findOne({
        email,
      });
      return isUserFound ? isUserFound : false;
    } catch (error) {
      showError(error);
    }
  }

  async createUser(userData: UserType) {
    try {
      const user = new UserModel(userData);
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      showError(error);
    }
  }

  async findUserById(id: string) {
    try {
      const user = await UserModel.findById(id);

      return user;
    } catch (error) {
      showError(error);
    }
  }
}

export default User;
