// import { IUser } from "./user";
import { IUser } from "./IUser";
export interface IUserWithToken {
  token: string;
  user: IUser;
}
