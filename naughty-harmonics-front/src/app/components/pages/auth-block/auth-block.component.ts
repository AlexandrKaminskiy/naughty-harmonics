import {Component, OnInit} from '@angular/core';
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";
import {GoogleOauthService} from "../../../util/googleOauthService";
import {NgIf} from "@angular/common";
import {AsyncLocalStorage} from "async_hooks";
import {fromEvent, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {routes} from "../../../app.routes";

@Component({
  selector: 'app-auth-block',
  standalone: true,
  imports: [
    GoogleSigninButtonModule,
    NgIf
  ],
  templateUrl: './auth-block.component.html',
  styleUrl: './auth-block.component.css'
})
export class AuthBlockComponent {

  public showSignOut: boolean = true

  constructor(public googleOauthService: GoogleOauthService, public router: Router) {
  }


  signOut() {
    this.googleOauthService.signOut()
    this.router.navigate([''])
  }

  protected readonly localStorage = localStorage;
}
