import { Component } from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {StaveComponent} from "../stave/stave.component";
import {NgForOf} from "@angular/common";
import {UtilService} from "../../util/utilService";
import {StaveInfo} from "../../dto/staveInfo";

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [
    SideBarComponent,
    StaveComponent,
    NgForOf
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  readonly startStavesCount: number = 1;
  staves: StaveInfo[] = []
  visibleStave: number

  constructor(public utilService: UtilService) {
    this.addStave()
    this.visibleStave = 0;
  }

  deleteStave(i: number) {
    this.staves.splice(i,1)
  }

  addStave() {
    this.staves.push({tacts: []})
  }

  changeContext(i: number) {
    this.visibleStave = i
  }
}
