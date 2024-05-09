import {Injectable} from "@angular/core";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class GoogleOauthService {

  constructor(public socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe(it => {
      console.log(it)
      localStorage.setItem('idToken', it.idToken)
    })
  }

  signOut() {
    this.socialAuthService.signOut(true)
    return localStorage.clear()
  }
}
