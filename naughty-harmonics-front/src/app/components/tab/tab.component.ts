import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
export class TabComponent implements OnInit {
  readonly startStavesCount: number = 1;
  staves: StaveInfo[] = []
  @Output() stavesEmitter = new EventEmitter<StaveInfo[]>
  visibleStave: number

  constructor(public utilService: UtilService) {
    this.addStave()
    this.visibleStave = 0;
  }
  ngOnInit() {
    this.stavesEmitter.emit(this.staves)
  }

  deleteStave(i: number) {
    this.staves.splice(i,1)
    this.stavesEmitter.emit(this.staves)
  }

  addStave() {
    this.staves.push({tacts: []})
    this.stavesEmitter.emit(this.staves)
  }

  changeContext(i: number) {
    this.visibleStave = i
  }
}
