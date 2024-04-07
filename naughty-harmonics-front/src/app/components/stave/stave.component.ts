import {Component, Input, OnInit} from '@angular/core';
import {TactComponent} from "../tact/tact.component";
import {NgForOf} from "@angular/common";
import {UtilService} from "../../util/utilService";
import {TactInfo} from "../../dto/tactInfo";

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
export class StaveComponent implements OnInit {
  @Input() id: number
  @Input() tacts: TactInfo[];
  // @Output() stave: EventEmitter<StaveInfo> = new EventEmitter<StaveInfo>()
  readonly noteLength: number = 2
  activeTact: number;
  activeTactSize: string = '';
  tactSizeValue: string;

  constructor(public utilService: UtilService) {
  }

  ngOnInit() {
    if (this.tacts.length > 0) {
      return
    }
    this.addTactInfo()
  }

  addTact() {
    this.addTactInfo()
    // this.stave.emit({tacts: this.tacts, id: this.id})
  }

  updateTactInfo($event: TactInfo) {
    this.tacts[$event.serialNumber] = $event
  }

  addTactInfo() {
    this.tacts.push({
      sizeStr: '4/4', serialNumber: this.tacts.length,
      notes: new Array(this.noteLength)
        .fill(false)
        .map(() => this.utilService.createColumn())
    });

  }

  updateActiveTact($event: any) {

    this.activeTact = $event.serialNumber
    this.activeTactSize = this.tacts[$event.serialNumber].sizeStr

    console.log(this.activeTact)
  }


  changeTactDuration($event: any) {
    const size: string = $event.target.value
    const numerator = size.split("/")[0]
    const denominator = size.split("/")[0]

    console.log(size)
    this.tacts[this.activeTact].sizeStr = size;
  }

  trackByTactValue(index: number, item: TactInfo) {
    return JSON.stringify(item);
  }
}
