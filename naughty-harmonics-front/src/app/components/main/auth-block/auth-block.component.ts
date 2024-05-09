import {Component, OnInit} from '@angular/core';
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";
import {GoogleOauthService} from "../../../util/googleOauthService";

@Component({
  selector: 'app-auth-block',
  standalone: true,
  imports: [
    GoogleSigninButtonModule
  ],
  templateUrl: './auth-block.component.html',
  styleUrl: './auth-block.component.css'
})
export class AuthBlockComponent {

  constructor(public googleOauthService: GoogleOauthService) {
  }

  signOut() {
    this.googleOauthService.signOut()
  }
}
