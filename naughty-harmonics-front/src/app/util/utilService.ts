import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  createRange(noteCount: number) {
    return new Array(noteCount).fill(0)
      .map((n, index) => index + 1);
  }

}
