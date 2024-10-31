
import User from "../db/logics/user";
import { UserType } from "../db/models/User";
class UserService {
  private User: User;
  constructor() {
    this.User = new User();
  }

  async CreateUser(userData: UserType) {
    const { email } = userData;
    const isUserExist = await this.User.checkUser(email);
    if (isUserExist) {
      return isUserExist;
    } else {
      const user = await this.User.createUser(userData);
      return user;
    }
  }
}

export default UserService;
