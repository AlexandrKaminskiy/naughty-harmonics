import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {NoteFunctionType} from "../../../dto/noteFunctionType";

@Component({
  selector: 'app-note-action',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './note-action.component.html',
  styleUrl: './note-action.component.css'
})
export class NoteActionComponent {
  @Input() value: string;
  @Input() function: NoteFunctionType
  protected readonly NoteFunctionType = NoteFunctionType;
}
