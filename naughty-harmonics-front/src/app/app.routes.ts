import {Routes} from '@angular/router';
import {AudioControlComponent} from "./components/creator/audio-control/audio-control.component";
import {RegistryComponent} from "./components/pages/registry/registry.component";
import {UnauthorizedComponent} from "./components/error/unauthorized/unauthorized.component";
import {AuthService} from "./util/authService";
import {NoAuthService} from "./util/noAuthService";
import {UserComponent} from "./components/pages/user/user.component";
import {MainPageComponent} from "./components/pages/main-page/main-page.component";
import {CompositionInfoPageComponent} from "./components/pages/sheet-info-page/composition-info-page.component";

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'info', component: CompositionInfoPageComponent, canActivate: [AuthService]},
  {path: 'profile', component: UserComponent, canActivate: [AuthService]},
  {path: 'creation', component: AudioControlComponent, canActivate: [AuthService]},
  {path: 'registry', component: RegistryComponent, canActivate: [NoAuthService]},
  {path: 'unauthorized', component: UnauthorizedComponent},
];
