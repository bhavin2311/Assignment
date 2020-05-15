import { User } from "./../../models/user";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  model = new User();
  login() {
    console.log(this.model);
  }
  ngOnInit(): void {}
}
