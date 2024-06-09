import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteDto} from "../../../dto/note";
import {NoteAction} from "../../../dto/noteAction";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {NoteDurationService} from "../../../util/noteDurationService";
import {NoteActionComponent} from "../note-action/note-action.component";
import {NoteFunctionType} from "../../../dto/noteFunctionType";
import {NOTE_LENGTH} from "../../../util/constants";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {Observable} from "rxjs";
import {NoteEmitterAction} from "../../../dto/noteEmitterAction";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    NgStyle,
    NoteActionComponent,
    NgClass,
    NgIf,
    TooltipModule
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {

  @Output() noteLocation = new EventEmitter<[number, number]>
  @Output() noteValue = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  @Input() oldValue: NoteDto
  @Input() row: number;
  @Input() column: number;
  @Input() events: Observable<[number, number, NoteEmitterAction]>;

  hasFocus: boolean;
  value: string;
  duration: number
  freshFocus: boolean = false
  valueRegExp = /^[0-9]*$/
  slideRegExp = /^([1-9]|[12][0-9]|3[01]\/[1-9]|[12][0-9]|3[01])$/
  backGround: string = '#a6a3a3';
  functionType: NoteFunctionType;

  constructor(public noteDurationService: NoteDurationService) {
  }

  ngOnInit() {
    this.value = this.oldValue.value
    this.duration = this.oldValue.duration
    this.functionType = this.oldValue.functionType
    this.events.subscribe(it => {
      if (it[0] == this.row && it[1] == this.column) {
        switch (it[2]) {
          case NoteEmitterAction.VIBRATO: this.vibrato(); break;
          case NoteEmitterAction.ADD_COLUMN: this.addColumn(); break;
          case NoteEmitterAction.BAND_UP: this.bandUp(); break;
          case NoteEmitterAction.BAND_DOWN: this.bandDown12(); break;
          case NoteEmitterAction.BAND_UP_12: this.bandUp12(); break;
          case NoteEmitterAction.BAND_DOWN_12: this.bandDown12(); break;
          case NoteEmitterAction.DEFAULT: this.default(); break;
          case NoteEmitterAction.REMOVE_COLUMN: this.removeColumn(); break;
          case NoteEmitterAction.ERASE_COLUMN: this.eraseColumn(); break;
        }
        console.log(`row ${this.row} column ${this.column}`)
      }
      this.noteLocation.emit([-1, this.column])
      this.updateValue()
    });
  }

  onKeyDown($event: KeyboardEvent) {

    const newValue = this.value + $event.key
    if (this.valueRegExp.test(newValue) || $event.key == 'Backspace') {

      if (this.freshFocus) {
        this.freshFocus = false
        this.value = ""
      }

      if ($event.key == 'Backspace') {
        this.value = this.value.slice(0, -1)
        return
      }

      this.value = newValue
    }

  }

  setFocusable() {
    console.log("focus")

    this.noteLocation.emit([this.row, this.column])
    // this.backGround = 'pink'
    this.freshFocus = true
    this.hasFocus = true

  }

  updateValue() {
    console.log("unfocus")

    this.hasFocus = false
    this.freshFocus = false
    this.backGround = '#a6a3a3'

    if (this.oldValue.value != this.value || this.oldValue.functionType != this.functionType) {
      this.noteValue.emit(
        {
          functionType: this.functionType,
          duration: this.duration,
          value: this.value,
          column: this.column,
          row: this.row,
          component: this
        })

    }
  }

  addColumn() {
    console.log('enter')
    this.action.emit({pos: this.column + 1, action: NoteAction.ADD_COLUMN})
  }

  removeColumn() {
    this.value = this.oldValue.value
    console.log('remove ' + this.column)
    this.action.emit({pos: this.column, action: NoteAction.REMOVE_COLUMN})
  }


  decreaseDuration() {
    if (this.duration == 1) {
      return
    }
    this.duration /= 2
    this.action.emit({pos: this.column, action: NoteAction.CHANGE_DURATION, duration: this.duration})
  }

  increaseDuration() {
    if (this.duration == 32) {
      return
    }
    this.duration *= 2
    this.action.emit({pos: this.column, action: NoteAction.CHANGE_DURATION, duration: this.duration})
  }

  eraseColumn() {
    this.action.emit({pos: this.column, action: NoteAction.ERASE_COLUMN})
  }

  bandUp() {
    if (!this.value) return
    this.functionType = NoteFunctionType.BAND_UP;
  }

  bandUp12() {
    if (!this.value) return
    this.functionType = NoteFunctionType.BAND_UP_12;
  }

  bandDown() {
    if (!this.value) return
    this.functionType = NoteFunctionType.BAND_DOWN;
  }

  bandDown12() {
    if (!this.value) return
    this.functionType = NoteFunctionType.BAND_DOWN_12;
  }

  vibrato() {
    if (!this.value) return
    this.functionType = NoteFunctionType.VIBRATO;
  }

  default() {
    if (!this.value) return
    this.functionType = NoteFunctionType.DEFAULT;
  }

  protected readonly NOTE_LENGTH = NOTE_LENGTH;
}
