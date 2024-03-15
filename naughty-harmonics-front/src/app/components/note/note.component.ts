import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteDto} from "../../dto/note";
import {Action} from "../../dto/action";
import {NgStyle} from "@angular/common";
import {NoteDurationService} from "../../dto/noteDurationService";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {

  @Output() noteValue = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  @Input() oldValue: NoteDto
  @Input() row: number;
  @Input() column: number;
  value: string;
  duration: number
  freshFocus: boolean = false
  valueRegExp = /^[0-9]*$/
  slideRegExp = /^([1-9]|[12][0-9]|3[01]\/[1-9]|[12][0-9]|3[01])$/
  backGround: string;

  constructor(public noteDurationService: NoteDurationService) {
  }

  ngOnInit() {
    this.value = this.oldValue.value
    this.duration = this.oldValue.duration
    this.backGround = this.noteDurationService.getColorByDuration(this.duration)
  }

  onKeyDown($event: KeyboardEvent) {

    if (this.freshFocus) {
      this.freshFocus = false
      this.value = ""
    }

    const newValue = this.value + $event.key

    if ($event.key == 'Backspace') {
      this.value = this.value.slice(0, -1)
      return
    }

    if (this.valueRegExp.test(newValue)) {
      this.value = newValue
    }

    console.log(this.value)
  }

  setFocusable() {
    this.backGround = 'pink'
    this.freshFocus = true
    console.log("focus")
  }

  setUnfocus() {
    this.freshFocus = false
    this.backGround = this.noteDurationService.getColorByDuration(this.duration)

    if (this.oldValue.value != this.value) {
      this.noteValue.emit(
        {
          duration: this.duration,
          value: this.value,
          column: this.column,
          row: this.row
        })
      console.log("unfocus")

    }
  }

  addColumn() {
    console.log('enter')
    this.action.emit({pos: this.column + 1, action: Action.ADD_COLUMN})
  }

  removeColumn() {
    this.value = this.oldValue.value
    console.log('remove ' + this.column)
    this.action.emit({pos: this.column, action: Action.REMOVE_COLUMN})
  }


  decreaseDuration() {
    if (this.duration == 1) {
      return
    }
    this.duration /= 2
    this.action.emit({pos: this.column, action: Action.CHANGE_DURATION, duration: this.duration})
  }

  increaseDuration() {
    if (this.duration == 32) {
      return
    }
    this.duration *= 2
    this.action.emit({pos: this.column, action: Action.CHANGE_DURATION, duration: this.duration})
  }

  eraseColumn() {
    this.action.emit({pos: this.column, action: Action.ERASE_COLUMN})
  }
}
