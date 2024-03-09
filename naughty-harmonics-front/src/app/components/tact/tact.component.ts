import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CordComponent} from "../cord/cord.component";
import {NgForOf, NgIf} from "@angular/common";
import {NoteComponent} from "../note/note.component";
import {NoteDto} from "../../dto/note";
import {UtilService} from "../../util/utilService";
import {Action} from "../../dto/action";

@Component({
  selector: 'app-tact',
  standalone: true,
  imports: [
    CordComponent,
    NgForOf,
    NoteComponent,
    NgIf
  ],
  templateUrl: './tact.component.html',
  styleUrl: './tact.component.css'
})
export class TactComponent {

  size: number = 32
  noteLength: number = 2
  check: boolean

  @Input() serialNumber: number
  @Output() isFull: EventEmitter<any> = new EventEmitter<any>()

  public notes: NoteDto[][] = new Array(this.noteLength)
    .fill(false)
    .map(() => [
        {value: '', duration: 1},
        {value: '', duration: 1},
        {value: '', duration: 1},
        {value: '', duration: 1},
        {value: '', duration: 1},
        {value: '', duration: 1}
      ]
    );

  constructor(public utilService: UtilService) {
  }

  changeTactValue($event: any) {
    console.log($event.column)
    console.log($event.row)
    this.notes[$event.column][$event.row] = $event

    if ($event.value && $event.column == this.notes.length - 1) {
      this.addColumn(this.notes.length)
    }
    console.log(this.notes)
  }
  // 15 1111
  addColumn(pos: number) {
    const dur = (Math.pow(2, Math.floor(Math.log2(this.size - this.getCurrentSize()))))
    console.log(dur)
    this.notes.splice(pos, 0, [
        {value: '', duration: dur},
        {value: '', duration: dur},
        {value: '', duration: dur},
        {value: '', duration: dur},
        {value: '', duration: dur},
        {value: '', duration: dur}
      ]
    );
    this.checkFull()
    console.log(this.notes)
  }

  removeColumn(pos: number) {
    console.log(`splice ${pos}`)
    this.notes.splice(pos, 1);

    console.log(this.notes)
  }

  handleAction($event: any) {
    switch ($event.action) {
      case Action.ADD_COLUMN:
        this.addColumn($event.pos);
        break
      case Action.REMOVE_COLUMN:
        this.removeColumn($event.pos);
        break
      case Action.CHANGE_DURATION:
        this.notes[$event.pos].forEach((value, index, array) => {
          array[index] = {value: value.value, duration: $event.duration}
        })
        this.checkFull()
        break
    }
  }

  getCurrentSize() {
    return this.notes.reduce((acc, it) => it[0].duration + acc, 0);
  }

  checkFull() {
    const sum = this.getCurrentSize()
    if (sum >= this.size) {
      this.isFull.emit({value: true, serialNumber: this.serialNumber})
    }
  }

}
