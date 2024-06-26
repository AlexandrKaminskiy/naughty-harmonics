import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {NoteComponent} from "./components/creator/note/note.component";
import {TactComponent} from "./components/creator/tact/tact.component";
import {StaveComponent} from "./components/creator/stave/stave.component";
import {SideBarComponent} from "./components/creator/side-bar/side-bar.component";
import {TabComponent} from "./components/creator/tab/tab.component";
import {AudioControlComponent} from "./components/creator/audio-control/audio-control.component";
import {RegistryComponent} from "./components/pages/registry/registry.component";
import {InitComponent} from "./components/pages/init/init.component";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import {AuthBlockComponent} from "./components/pages/auth-block/auth-block.component";
import {HeaderComponent} from "./components/pages/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NoteComponent, TactComponent, StaveComponent, SideBarComponent, TabComponent, AudioControlComponent, RegistryComponent, InitComponent, GoogleSigninButtonModule, AuthBlockComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'naughty-harmonics-front';

}
