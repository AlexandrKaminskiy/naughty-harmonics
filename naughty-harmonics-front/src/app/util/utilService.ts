import { Injectable } from '@angular/core';
import {NoteDto} from "../dto/note";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  createRange(noteCount: number) {
    return new Array(noteCount).fill(0)
      .map((n, index) => index + 1);
  }

  createColumn(duration: number = 1): NoteDto[] {
    return [
      {value: '', duration: duration},
      {value: '', duration: duration},
      {value: '', duration: duration},
      {value: '', duration: duration},
      {value: '', duration: duration},
      {value: '', duration: duration}
    ]
  }
}
