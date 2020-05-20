import { Observable } from "rxjs";
import { IUserWithToken } from "./../Models/IUserWithToken";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IUser } from "../Models/user";
import { Injectable, EventEmitter } from "@angular/core";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  token: string = null;
  user: IUser = <IUser>null;
  header: HttpHeaders;
  userLoggedIn: EventEmitter<IUser> = new EventEmitter();
  userLoggedOut: EventEmitter<any> = new EventEmitter();

  private storageKey = "userInfo";

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
  }

  login(username: string, password: string) {
    return this.http
      .post(
        "https://localhost:44335/api/Account/login",
        {
          username: username,
          password: password,
        },
        { headers: this.header }
      )
      .pipe(
        map((res: IUserWithToken) => {
          // console.log(res);
          this.loginInternal(res);
        })
      );
  }

  register(user: IUser) {}
  private loginInternal(data: IUserWithToken) {
    this.token = data.token;
    this.user = data.user;
    console.log(this.token);
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
    this.userLoggedIn.emit(this.user);
  }
}
