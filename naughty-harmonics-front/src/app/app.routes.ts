import {Routes} from '@angular/router';
import {AudioControlComponent} from "./components/creator/audio-control/audio-control.component";
import {RegistryComponent} from "./components/main/registry/registry.component";

export const routes: Routes = [
  {path: 'creation', component: AudioControlComponent},
  {path: 'registry', component: RegistryComponent},
];
