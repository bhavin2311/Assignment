export interface IUser {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export class Roles {
  static Administrator = "Administrator";
  static Manager = "Manager";
}
