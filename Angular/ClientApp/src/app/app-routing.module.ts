import { ChangepasswordComponent } from "./containers/changepassword/changepassword.component";
import { AuthGuard } from "./Security/auth.guard";
import { YogeshComponent } from "./test/yogesh/yogesh.component";
import { ExpenseComponent } from "./containers/expense/expense.component";
import { RegisterComponent } from "./containers/register/register.component";
import { LoginComponent } from "./containers/login/login.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: UserFormComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "expense",
    component: ExpenseComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: "changepassword",
    component: ChangepasswordComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponets = [
  RegisterComponent,
  LoginComponent,
  UserFormComponent,
];
