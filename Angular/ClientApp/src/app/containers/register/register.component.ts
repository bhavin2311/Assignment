import { AlertService } from "./../alert/alert.service";
import { IUser } from "./../../Models/IUser";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alert: AlertService
  ) {}

  model: any = {};
  loading = false;

  register() {
    this.loading = true;

    console.log(JSON.stringify(this.model));
    this.authService.register(<IUser>this.model).subscribe(
      (data) => {
        this.alert.success("Register Succesfully !!");
        this.router.navigate(["/login"]);
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.alert.error(error.error);
      }
    );
  }

  ngOnInit(): void {}
}
