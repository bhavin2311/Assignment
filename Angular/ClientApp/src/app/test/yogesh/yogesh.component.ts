import { input } from "./../../Models/input";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-yogesh",
  templateUrl: "./yogesh.component.html",
  styleUrls: ["./yogesh.component.css"],
})
export class YogeshComponent implements OnInit {
  lists: input[] = [
    { id: 1, fildname: "FirstName", fildtype: "input" },
    { id: 2, fildname: "LastName", fildtype: "input" },
    { id: 3, fildname: "startdate", fildtype: "date" },
    { id: 4, fildname: "enddate", fildtype: "date" },
    { id: 5, fildname: "gender", fildtype: "checkbox" },
  ];

  model: any = {};
  constructor() {}

  ngOnInit(): void {}
  submit() {
    console.log(this.model);
  }
}
