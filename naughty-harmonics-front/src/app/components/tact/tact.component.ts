import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CordComponent} from "../cord/cord.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {NoteComponent} from "../note/note.component";
import {NoteDto} from "../../dto/note";
import {UtilService} from "../../util/utilService";
import {NoteAction} from "../../dto/noteAction";
import {TactInfo} from "../../dto/tactInfo";
import {NoteDurationService} from "../../dto/noteDurationService";

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
  @Output() tactAction: EventEmitter<any> = new EventEmitter<any>()

  @Input() notes: NoteDto[][]

  constructor(public utilService: UtilService, public noteDurationService: NoteDurationService) {
  }

  ngOnInit() {
    this.changeWarningBorder();
  }

  changeTactValue($event: any) {
    this.notes[$event.column][$event.row] = {value: $event.value, duration: $event.duration}

    if ($event.value && $event.column == this.notes.length - 1) {
      this.addColumn(this.notes.length)
    }
    this.tactInfo.emit({notes: this.notes, serialNumber: this.serialNumber, size: this.size})
  }

  addColumn(pos: number) {
    if (this.getCurrentSize() >= this.size) {
      return
    }
    const duration = Math.pow(2, Math.floor(Math.log2(this.size - this.getCurrentSize())))
    this.notes.splice(pos, 0, this.utilService.createColumn(duration));
    this.checkFull()
  }

  removeColumn(pos: number) {
    if (this.notes.length == 1) {
      return
    }

    this.notes.splice(pos, 1);
  }

  handleAction($event: any) {
    switch ($event.action) {
      case NoteAction.ADD_COLUMN:
        this.addColumn($event.pos);
        break
      case NoteAction.REMOVE_COLUMN:
        this.removeColumn($event.pos);
        break
      case NoteAction.CHANGE_DURATION:
        this.notes[$event.pos].forEach((value, index, array) => {
          array[index] = {value: value.value, duration: $event.duration}
        })
        this.checkFull()
        break
      case NoteAction.ERASE_COLUMN:
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

  changeWarningBorder(): string {
    if (this.getCurrentSize() != this.size) {
      return '2px solid rgba(255, 0, 0, .4)'
    } else {
      return '2px solid rgba(0, 0, 0, .1)'
    }
  }

  getDurationColor(i: number): string {
    return this.noteDurationService.getColorByDuration(this.notes[i][0].duration)
  }

  checkPauses(i: number): boolean {
    return this.notes[i].some(it => it.value)
  }
}
