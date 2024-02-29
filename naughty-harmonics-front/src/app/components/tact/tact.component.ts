import { Component } from '@angular/core';
import {CordComponent} from "../cord/cord.component";
import {NgForOf} from "@angular/common";
import {NoteComponent} from "../note/note.component";

@Component({
  selector: 'app-tact',
  standalone: true,
  imports: [
    CordComponent,
    NgForOf,
    NoteComponent
  ],
  templateUrl: './tact.component.html',
  styleUrl: './tact.component.css'
})
export class TactComponent {

  size: number = 4


  changeTactValue($event: any) {
    console.log($event)
  }
}
