import {Component} from '@angular/core';
import {CordComponent} from "../cord/cord.component";
import {NgForOf} from "@angular/common";
import {NoteComponent} from "../note/note.component";
import {NoteDto} from "../../dto/note";
import {UtilService} from "../../util/utilService";
import {Action} from "../../dto/action";
import {NoteAction} from "../../dto/noteAction";

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
  noteLength: number = 2

  public notes: NoteDto[][] = new Array(this.noteLength)
    .fill(false)
    .map(() =>
      new Array(6).fill({})
    );

  constructor(public utilService: UtilService) {
  }

  changeTactValue($event: any) {

    this.notes[$event.column][$event.row] = $event

    if ($event.value && $event.column == this.notes.length - 1) {
      this.addColumn(this.notes.length)
    }

    console.log($event)
  }

  addColumn(pos: number) {
    this.notes.splice(pos, 0, new Array(6).fill({}));
  }

  removeColumn(pos: number) {
    console.log(`splice ${pos}`)
    this.notes.splice(pos, 1);

    console.log(this.notes)
  }

  handleAction($event: NoteAction) {
    switch ($event.action) {
      case Action.ADD_COLUMN : this.addColumn($event.pos); break
      case Action.REMOVE_COLUMN: this.removeColumn($event.pos); break
    }
  }

}
