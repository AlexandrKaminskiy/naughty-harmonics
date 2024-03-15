import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CordComponent} from "../cord/cord.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {NoteComponent} from "../note/note.component";
import {NoteDto} from "../../dto/note";
import {UtilService} from "../../util/utilService";
import {Action} from "../../dto/action";
import {TactInfo} from "../../dto/tactInfo";

@Component({
  selector: 'app-tact',
  standalone: true,
  imports: [
    CordComponent,
    NgForOf,
    NoteComponent,
    NgIf,
    NgStyle
  ],
  templateUrl: './tact.component.html',
  styleUrl: './tact.component.css'
})
export class TactComponent implements OnInit {

  @Input() size: number
  @Input() staveAcknowledged: boolean
  warningBorder: string
  @Input() serialNumber: number
  @Output() isFull: EventEmitter<any> = new EventEmitter<any>()
  @Output() tactInfo: EventEmitter<TactInfo> = new EventEmitter<TactInfo>()

  @Input() notes: NoteDto[][]

  constructor(public utilService: UtilService) {
  }

  ngOnInit() {
    this.changeWarningBorder();
  }

  changeTactValue($event: any) {
    console.log($event.column)
    console.log($event.row)
    this.notes[$event.column][$event.row] = {value: $event.value, duration: $event.duration}

    if ($event.value && $event.column == this.notes.length - 1) {
      this.addColumn(this.notes.length)
    }
    this.tactInfo.emit({notes: this.notes, serialNumber: this.serialNumber, size: this.size})
    console.log(this.notes)
  }

  addColumn(pos: number) {
    if (this.getCurrentSize() >= this.size) {
      return
    }
    const duration = Math.pow(2, Math.floor(Math.log2(this.size - this.getCurrentSize())))
    console.log(duration)
    this.notes.splice(pos, 0, this.utilService.createColumn(duration));
    this.checkFull()
    console.log(this.notes)
  }

  removeColumn(pos: number) {
    if (this.notes.length == 1) {
      return
    }

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
      case Action.ERASE_COLUMN:
        this.notes[$event.pos].forEach((value, index, array) => {
          array[index] = {value: '', duration: array[index].duration}
        })
        this.checkFull()
        break
    }
    this.tactInfo.emit({notes: this.notes, serialNumber: this.serialNumber, size: this.size})
  }

  getCurrentSize() {
    return this.notes.reduce((acc, it) => it[0].duration + acc, 0);
  }

  checkFull() {
    const sum = this.getCurrentSize()
    if (!this.staveAcknowledged && sum >= this.size) {
      this.staveAcknowledged = true
      this.isFull.emit({value: true, serialNumber: this.serialNumber})
    }
  }

  changeWarningBorder() {
    if (this.getCurrentSize() != this.size) {
      this.warningBorder = '2px red solid'
    } else {
      this.warningBorder = ''
    }
  }
}
