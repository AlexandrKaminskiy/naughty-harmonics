import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {StaveComponent} from "../stave/stave.component";
import {NgForOf, NgStyle} from "@angular/common";
import {UtilService} from "../../../util/utilService";
import {StaveInfo} from "../../../dto/staveInfo";
import {Instrument} from "../../../dto/instrument";
import {START_LEFT_OFFSET, START_TOP_OFFSET} from "../../../util/constants";
import {TooltipModule} from "ngx-bootstrap/tooltip";

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [
    SideBarComponent,
    StaveComponent,
    NgForOf,
    NgStyle,
    TooltipModule
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent implements OnInit, OnChanges {


  readonly startStavesCount: number = 1;
  @Input() staves: StaveInfo[]
  @Output() stavesEmitter = new EventEmitter<StaveInfo[]>
  @Output() visibleStaveEmitter = new EventEmitter<number>
  visibleStave: number

  constructor(public utilService: UtilService) {
    this.visibleStave = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (this.staves.length > 0) {
    //   this.staves.forEach(it => {
    //     it.sliderContext = this.createSliderContext()
    //     this.stavesEmitter.emit(this.staves)
    //   })
    // }
  }

  ngOnInit() {
    if (this.staves.length == 0) {
      this.addStave()
    }
  }

  deleteStave($event: any, i: number) {
    this.staves.splice(i, 1)
    console.log(this.staves)
    if (this.staves.length > 0) {
      if (this.visibleStave != 0) {
        this.visibleStave--
        this.visibleStaveEmitter.emit(this.visibleStave)
      }
    }
    this.stavesEmitter.emit(this.staves)
    $event.stopPropagation();
  }

  addStave() {
    this.staves.push({
      tacts: [], sliderContext: this.utilService.createSliderContext(), instrument: Instrument.GUITAR
    })
    this.stavesEmitter.emit(this.staves)
  }

  createSliderContext() {
    return {
      left: START_LEFT_OFFSET,
      top: START_TOP_OFFSET,
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
