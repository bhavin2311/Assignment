import { Router } from "@angular/router";
import { AuthService } from "./../../Services/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: "main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"],
})
export class MainNavComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user: any;
  userIsLogged: boolean;
  userSubscription: any;
  userLogoutSubscription: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.userLoggedIn.subscribe((u) => {
      this.userIsLogged = true;
      this.user = u;
    });

    this.userLogoutSubscription = this.authService.userLoggedOut.subscribe(
      (u) => {
        this.userIsLogged = false;
        this.user = null;
      }
    );
  }

  ngOnDestroy(): void {
    this.userIsLogged = false;
    this.user = null;

    this.userSubscription.unsubscribe();
    this.userLogoutSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
