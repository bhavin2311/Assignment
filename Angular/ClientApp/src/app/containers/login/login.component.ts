import { IUserWithToken } from "./../../Models/IUserWithToken";
import { IUser } from "../../Models/user";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "src/app/Security/auth.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",

  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  hide = true;
  model = new IUser();
  login() {
    this.authService.login(this.model.username, this.model.password).subscribe(
      (data) => {
        console.log("Logged in success!!");
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {}
}
