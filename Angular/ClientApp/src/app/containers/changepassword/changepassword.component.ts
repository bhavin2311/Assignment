import { AuthService } from "src/app/Security/auth.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Location } from "@angular/common";
@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.css"],
})
export class ChangepasswordComponent implements OnInit {
  model = {
    password: "",
    confirmpassword: "",
  };

  constructor(private location: Location, private authService: AuthService) {}

  ngOnInit(): void {}
  submit() {
    console.log(JSON.stringify(this.model));
    this.authService
      .changePassword(this.model.password, this.model.confirmpassword)
      .subscribe(
        (data) => {
          this.location.back();
        },
        (error) => {
          console.log(error._body);
        }
      );
  }
}
