import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  token: string = null;
  user: User = null;
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.http.post("/api/account/login", {
      Username: username,
      Password: password,
    });
  }
}
