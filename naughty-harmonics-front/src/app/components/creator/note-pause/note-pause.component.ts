import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {UtilService} from "../../../util/utilService";

@Component({
  selector: 'app-note-pause',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './note-pause.component.html',
  styleUrl: './note-pause.component.css'
})
export class NotePauseComponent {
  @Input() size: number;

  constructor(public utilService: UtilService) {
  }

  getRange() {
    if (this.size == 8) {
      return 1;
    }
    if (this.size == 16) {
      return 2;
    }
    if (this.size == 32) {
      return 3;
    }
    return 0;
  }

  getVerticalLineStyle() {
    if (this.size == 2) {
      return 'half'
    }
    if (this.size > 2) {
      return 'bigger-then-half'
    }
    return
  }

}
