import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {StaveComponent} from "../stave/stave.component";
import {NgForOf} from "@angular/common";
import {UtilService} from "../../../util/utilService";
import {StaveInfo} from "../../../dto/staveInfo";

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
export class TabComponent implements OnInit, OnChanges {

  readonly START_LEFT_OFFSET = 10;
  readonly START_TOP_OFFSET = 10;

  readonly startStavesCount: number = 1;
  @Input() staves: StaveInfo[]
  @Output() stavesEmitter = new EventEmitter<StaveInfo[]>
  @Output() visibleStaveEmitter = new EventEmitter<number>
  visibleStave: number

  constructor(public utilService: UtilService) {
    this.visibleStave = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (this.staves.length > 0) {
      this.staves.forEach(it => {
        it.sliderContext = this.createSliderContext()
        this.stavesEmitter.emit(this.staves)
      })
    }
  }

  ngOnInit() {
    if (this.staves.length == 0) {
      this.addStave()
    }
    // this.stavesEmitter.emit(this.staves)
  }

  deleteStave(i: number) {
    this.staves.splice(i, 1)
    this.stavesEmitter.emit(this.staves)
  }

  addStave() {
    this.staves.push({
      tacts: [], sliderContext: this.createSliderContext()
    })
    this.stavesEmitter.emit(this.staves)
  }

  createSliderContext() {
    return {
      left: this.START_LEFT_OFFSET,
      top: this.START_TOP_OFFSET,
      playIntervals: [],
      currentInterval: 0,
      intervals: [],
      timeouts: []
    }
  }
  changeContext(i: number) {
    this.visibleStave = i
    this.visibleStaveEmitter.emit(i)
  }
}
