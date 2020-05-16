import { User } from "./../../Models/user";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}
  durationInSeconds = 5;

  hide = true;
  model = new User();
  register() {
    console.log(this.model);
  }
  // openSnackBar() {
  //   this._snackBar.openFromComponent(UserFormComponent, {
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }
  ngOnInit(): void {}
}
