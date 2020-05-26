import { AlertService } from "./../../containers/alert/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { IUser } from "../../Models/IUser";
import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/Services/auth.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",

  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alert: AlertService
  ) {}

  hide = true;
  model: any = {};
  returnUrl: string;
  loading = false;

  login() {
    this.loading = true;
    console.log(this.model);

    this.authService.login(this.model.username, this.model.password).subscribe(
      (data) => {
        this.router.navigate([this.returnUrl]);
        this.alert.success("Login Successfully!!");
      },
      (error) => {
        console.error(error.error);
        this.alert.error(error.error);

        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
}
