import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {NoteComponent} from "./components/note/note.component";
import {TactComponent} from "./components/tact/tact.component";
import {StaveComponent} from "./components/stave/stave.component";
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {TabComponent} from "./components/tab/tab.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NoteComponent, TactComponent, StaveComponent, SideBarComponent, TabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'naughty-harmonics-front';
}
