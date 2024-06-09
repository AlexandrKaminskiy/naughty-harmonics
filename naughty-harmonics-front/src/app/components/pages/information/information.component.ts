import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {
  active: boolean[] = [true, false, false, false];

  makeActive(i: number) {
    this.active = [false, false, false, false];
    this.active[i] = true;
  }
}
