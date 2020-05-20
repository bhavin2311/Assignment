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
  constructor() {}

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  public gridData: any[] = employees;
  public gridView: any[];
  public mySelection: string[] = [];

  ngOnInit(): void {
    this.gridView = this.gridData;
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
}
