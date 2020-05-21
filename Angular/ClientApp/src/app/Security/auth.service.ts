import { Observable } from "rxjs";
import { IUserWithToken } from "./../Models/IUserWithToken";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IUser } from "../Models/Iuser";
import { Injectable, EventEmitter } from "@angular/core";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  token: string = null;
  user: IUser = <IUser>null;
  header: HttpHeaders = new HttpHeaders();
  userLoggedIn: EventEmitter<IUser> = new EventEmitter();
  userLoggedOut: EventEmitter<any> = new EventEmitter();

  private storageKey = "userInfo";

  constructor(private http: HttpClient) {
    // this.header = new HttpHeaders({
    //   "Content-Type": "application/json; charset=utf-8",
    // });
  }

  login(username: string, password: string) {
    return this.http
      .post(
        "https://localhost:44335/api/Account/login",
        {
          username: username,
          password: password,
        },
        {
          headers: this.header.append(
            "Content-Type",
            "application/json; charset=utf-8"
          ),
        }
      )
      .pipe(
        map((res: IUserWithToken) => {
          // console.log(res);
          this.loginInternal(res);
        })
      );
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(
      "https://localhost:44335/api/Account/register",
      JSON.stringify(user),
      {
        headers: this.header.append(
          "Content-Type",
          "application/json; charset=utf-8"
        ),
      }
    );
  }
  private loginInternal(data: IUserWithToken) {
    this.token = data.token;
    debugger;
    this.user = data.user;
    console.log(this.token);
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
    this.userLoggedIn.emit(this.user);
  }
  logout() {
    // remove user from local storage to log user out
    this.token = null;
    this.user = <IUser>null;

    sessionStorage.removeItem(this.storageKey);

    this.userLoggedOut.emit(null);
  }

  changePassword(password: string, confirmpassword: string) {
    debugger;
    return this.http.post(
      "https://localhost:44335/api/Account/changepassword",
      {
        Password: password,
        ConfirmPassword: confirmpassword,
      },
      {
        headers: this.header
          .append("Content-Type", "application/json; charset=utf-8")
          .append("Authorization", "Bearer " + this.token),
      }
    );
  }
  tryGetInfoFromStore(): boolean {
    var data = sessionStorage.getItem(this.storageKey);

    if (data === null) {
      return false;
    }

    this.loginInternal(JSON.parse(data));
    return true;
  }
  isLoggedIn() {
    return this.token != null;
  }
}
