import { HttpClient } from "@angular/common/http";
import { IUser } from "../../Models/user";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient) {}
  durationInSeconds = 5;

  hide = true;
  model = new IUser();
  register() {
    console.log(JSON.stringify(this.model));
  }

  ngOnInit(): void {}
}
