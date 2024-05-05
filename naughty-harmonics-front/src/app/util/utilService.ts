import {Injectable} from '@angular/core';
import {NoteDto} from "../dto/note";
import {NoteFunctionType} from "../dto/noteFunctionType";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  createRange(noteCount: number) {
    return new Array(noteCount).fill(0)
      .map((n, index) => index + 1);
  }

  createColumn(duration: number = 1, value = ''): NoteDto[] {
    return [
      {value: value, duration: duration, functionType: NoteFunctionType.DEFAULT},
      {value: value, duration: duration, functionType: NoteFunctionType.DEFAULT},
      {value: value, duration: duration, functionType: NoteFunctionType.DEFAULT},
      {value: value, duration: duration, functionType: NoteFunctionType.DEFAULT},
      {value: value, duration: duration, functionType: NoteFunctionType.DEFAULT},
      {value: value, duration: duration, functionType: NoteFunctionType.DEFAULT}
    ]
  }

  toRealDuration(duration: number) {
    switch (duration) {
      case 1: return 32;
      case 2: return 16;
      case 4: return 8;
      case 8: return 4;
      case 16: return 2;
      case 32: return 1;
    }
    throw new Error("cannot get valid duration")
  }
}
