import {Component} from '@angular/core';
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";
import {Router, RouterLink} from "@angular/router";
import {AuthBlockComponent} from "../auth-block/auth-block.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    GoogleSigninButtonModule,
    AuthBlockComponent,
    RouterLink
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private authService: SocialAuthService,
    private router: Router
  ) {
  }
}
