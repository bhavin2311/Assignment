import { profile } from "./profile";
import { AuthService } from "src/app/Services/auth.service";
import { Routes, Router } from "@angular/router";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { Component, OnInit, ViewChild } from "@angular/core";
import { employees } from "./exmplyoee";
import { process } from "@progress/kendo-data-query";
import { images } from "./image";
@Component({
  selector: "app-expense",
  templateUrl: "./expense.component.html",
  styleUrls: ["./expense.component.css"],
})
export class ExpenseComponent implements OnInit {
  constructor(private router: Router, private service: AuthService) {}

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  public gridData: profile[];
  public gridView: any[];
  public mySelection: string[] = [];

  ngOnInit(): void {
    this.service.getProfile().subscribe(
      (data: profile[]) => {
        this.gridData = data;
        console.log(this.gridData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "full_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "job_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "budget",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "phone",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "address",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
  public photoURL(dataItem: any): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: any = images;

    return image[code];
  }
  public flagURL(dataItem: any): string {
    const code: string = dataItem.country;
    const image: any = images;

    return image[code];
  }

  editHandler(data: any) {
    console.log(data);

    // this.router.navigate(["expense", data.id, "edit"]);
  }
  removeHandler(data: any) {
    console.log(data.id);
    //Delete Item Form List
  }
}
