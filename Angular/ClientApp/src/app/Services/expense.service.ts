import { IExpense } from "./../Models/IExpense";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ORIGIN_URL } from "./../shared/base_url";
@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  constructor(private http: HttpClient) {}
  baseurl: string = ORIGIN_URL;
  update(item: IExpense): Observable<any> {
    return this.http.put(`${this.baseurl}/api/expenses` + item.id, item);
  }

  add(item: IExpense): Observable<any> {
    return this.http.post(`${this.baseurl}/api/expenses`, item);
  }
}
