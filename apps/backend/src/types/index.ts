import { UserType } from "../db/models/User";

export interface ExtendedUserType extends UserType {
  _id: string;
}
