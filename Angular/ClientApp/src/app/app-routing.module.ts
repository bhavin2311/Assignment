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
