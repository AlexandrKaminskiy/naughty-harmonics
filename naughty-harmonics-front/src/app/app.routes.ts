import {Routes} from '@angular/router';
import {AudioControlComponent} from "./components/creator/audio-control/audio-control.component";
import {RegistryComponent} from "./components/main/registry/registry.component";
import {UnauthorizedComponent} from "./components/error/unauthorized/unauthorized.component";
import {AuthService} from "./util/authService";
import {NoAuthService} from "./util/noAuthService";

export const routes: Routes = [
  {path: 'creation', component: AudioControlComponent},
  {path: 'registry', component: RegistryComponent, canActivate: [NoAuthService]},
  {path: 'unauthorized', component: UnauthorizedComponent},
];
