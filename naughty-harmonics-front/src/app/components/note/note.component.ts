import {Component, EventEmitter, Output} from '@angular/core';
import {NoteDto} from "../../dto/note";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {

  @Output() noteValue = new EventEmitter<NoteDto>();
  value: string = "";
  freshFocus: boolean = false
  valueRegExp = /^[0-9]*$/
  onClick() {

  }

  onKeyDown($event: KeyboardEvent) {
    if (this.freshFocus) {
      this.freshFocus = false
      this.value = ""
    }

    if ($event.key == 'Backspace') {
      this.value = this.value.slice(0, -1)
      return
    }

    const newValue = this.value + $event.key

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
    // this.noteValue.emit("123132123")
    console.log("unfocus")
  }
}
