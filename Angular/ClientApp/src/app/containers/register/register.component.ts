import { IUser } from "./../../Models/IUser";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Security/auth.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  model: any = {};
  loading = false;

  register() {
    this.loading = true;

    console.log(JSON.stringify(this.model));
    this.authService.register(<IUser>this.model).subscribe(
      (data) => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        //  this.alertService.success("Registration successful", true);
        this.router.navigate(["/login"]);
      },
      (error) => {
        // this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {}
}
