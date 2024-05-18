import {Injectable} from "@angular/core";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GoogleOauthService {

  constructor(
    public socialAuthService: SocialAuthService,
    public router: Router
  ) {
    this.socialAuthService.authState.subscribe(it => {
      console.log(it)
      this.router.navigate(['profile'])
      localStorage.setItem('idToken', it.idToken)
    })
  }

  signOut() {
    this.socialAuthService.signOut(true).then(() => this.router.navigate(['']))
    return localStorage.clear()
  }
}
