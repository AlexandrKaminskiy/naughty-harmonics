import {Component, input} from '@angular/core';
import {TactComponent} from "../tact/tact.component";
import {NgForOf} from "@angular/common";
import {UtilService} from "../../util/utilService";
import {TactInfo} from "../../dto/tactInfo";
import {TactAction} from "../../dto/tactAction";

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
  tacts: TactInfo[] = [];
  noteLength: number = 2

  constructor(public utilService: UtilService) {
    this.addTactInfo();
  }

  addTact() {
    this.addTactInfo()
  }

  updateTactInfo($event: TactInfo) {
    this.tacts[$event.serialNumber] = $event
  }

  addTactInfo() {
    this.tacts.push({
      size: 32, serialNumber: this.tacts.length,
      notes: new Array(this.noteLength)
        .fill(false)
        .map(() => this.utilService.createColumn())
    });

  }
}
