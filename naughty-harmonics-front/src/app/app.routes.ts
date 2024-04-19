import {Routes} from '@angular/router';
import {AudioControlComponent} from "./components/creator/audio-control/audio-control.component";
import {RegistryComponent} from "./components/registry/registry.component";

export const routes: Routes = [
  {path: 'init', component: RegistryComponent},
  {path: 'creation', component: AudioControlComponent}
];
