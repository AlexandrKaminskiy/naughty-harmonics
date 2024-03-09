import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteDto} from "../../dto/note";
import {Action} from "../../dto/action";
import {NoteAction} from "../../dto/noteAction";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {

  @Output() noteValue = new EventEmitter<any>();
  @Output() action = new EventEmitter<NoteAction>();
  @Input() oldValue: NoteDto
  @Input() row : number;
  @Input() column : number;
  value: string;
  freshFocus: boolean = false
  valueRegExp = /^[0-9]*$/
  slideRegExp = /^([1-9]|[12][0-9]|3[01]\/[1-9]|[12][0-9]|3[01])$/

  ngOnInit() {
    console.error(`i ${this.column} j ${this.row}`)
    this.value = this.oldValue.value
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
    this.freshFocus = true
    console.log("focus")
  }

  setUnfocus() {
    this.freshFocus = false

    if (this.oldValue.value != this.value) {
      this.noteValue.emit(
        {
          duration: 1,
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
    console.log('remove ' + this.column)
    this.action.emit({pos: this.column, action: Action.REMOVE_COLUMN})
  }
}
