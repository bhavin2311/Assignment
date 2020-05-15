import { User } from "./../../models/user";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor() {}

  model = new User();
  login() {
    console.log(this.model);
  }

  ngOnInit(): void {}
}
