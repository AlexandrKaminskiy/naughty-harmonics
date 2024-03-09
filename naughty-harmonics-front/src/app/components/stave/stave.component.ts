import { Component } from '@angular/core';
import {TactComponent} from "../tact/tact.component";
import {NgForOf} from "@angular/common";
import {UtilService} from "../../util/utilService";

@Component({
  selector: 'app-stave',
  standalone: true,
  imports: [
    TactComponent,
    NgForOf
  ],
  templateUrl: './stave.component.html',
  styleUrl: './stave.component.css'
})
export class StaveComponent {
  tactQuantity: number = 2;

  constructor(public utilService: UtilService) {
  }

  addTact() {

  }
}
