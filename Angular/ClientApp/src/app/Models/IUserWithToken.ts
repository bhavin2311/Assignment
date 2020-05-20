import { IUser } from "./user";

export interface IUserWithToken {
  token: string;
  user: IUser;
}
