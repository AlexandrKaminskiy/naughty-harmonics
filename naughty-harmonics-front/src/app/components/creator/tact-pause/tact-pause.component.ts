import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-tact-pause',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './tact-pause.component.html',
  styleUrl: './tact-pause.component.css'
})
export class TactPauseComponent {

  @Input() duration: number

  getPauseStyle(): string {
    return 'pause _' + this.duration
  }

  getImg() {
    return `assets/pause/${this.duration}.png`
  }
}
