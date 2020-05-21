import { Router, ActivatedRoute } from "@angular/router";
import { IUser } from "../../Models/IUser";
import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/Security/auth.service";
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
    private authService: AuthService
  ) {}

  hide = true;
  model: any = {};
  returnUrl: string;
  loading = false;

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password).subscribe(
      (data) => {
        console.log("Logged in success!!");

        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        console.error(error._body);

        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
}
