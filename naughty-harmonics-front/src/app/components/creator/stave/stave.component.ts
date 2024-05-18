import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TactComponent} from "../tact/tact.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {UtilService} from "../../../util/utilService";
import {TactInfo} from "../../../dto/tactInfo";
import {TACTS_WIDTH, VERTICAL_TACT_MARGIN} from "../../../util/constants";

@Component({
  selector: 'app-stave',
  standalone: true,
  imports: [
    TactComponent,
    NgForOf,
    NgStyle,
    NgIf
  ],
  templateUrl: './stave.component.html',
  styleUrl: './stave.component.css'
})
export class StaveComponent implements OnInit, AfterViewInit {
  @Input() id: number
  @Input() tacts: TactInfo[];
  readonly NOTE_LENGTH: number = 2
  private static readonly MAX_TACT_SIZE = 2
  private static readonly ATOMIC_TACT_DIVISION = 0.125

  activeTact: number;
  activeTactSize: string = '';
  tactSizeValue: string;

  @ViewChildren("tact") children: QueryList<ElementRef>

  constructor(public utilService: UtilService) {
  }

  ngAfterViewInit() {
    console.log(this.children)
    this.children.changes
      .subscribe((next: QueryList<ElementRef>) => {
        next.forEach(it => this.handleTactChange(it.nativeElement))
      });
  }

  private handleTactChange(nativeElement: any) {
    const rect = nativeElement.getBoundingClientRect();
    this.tacts[nativeElement.id].topLeftCorner = rect.y
    this.tacts[nativeElement.id].width = rect.width
    this.tacts[nativeElement.id].height = rect.height
    console.log(this.tacts[nativeElement.id].topLeftCorner)
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
      sizeStr: this.getPreviousTactSize(), serialNumber: this.tacts.length,
      notes: new Array(this.NOTE_LENGTH)
        .fill(false)
        .map(() => this.utilService.createColumn())
    });

  }

  getPreviousTactSize() {
    return this.tacts.length == 0 ? '4/4' : this.tacts[this.tacts.length - 1].sizeStr
  }

  updateActiveTact($event: any) {

    this.activeTact = $event.serialNumber
    this.activeTactSize = this.tacts[$event.serialNumber].sizeStr

    console.log(this.activeTact)
  }


  changeTactDuration($event: any) {
    const size: string = $event.target.value

    const numerator = +size.split("/")[0]
    const denominator = +size.split("/")[1]

    console.log(numerator, ' ', denominator)
    if (isNaN(numerator) || isNaN(denominator)) {
      $event.target.value = this.tacts[this.activeTact].sizeStr
      return;
    }
    if (numerator / denominator > StaveComponent.MAX_TACT_SIZE) {
      console.log('size > 2, ', size)
      $event.target.value = this.tacts[this.activeTact].sizeStr
      return
    }

    if (((numerator % denominator) / denominator) % StaveComponent.ATOMIC_TACT_DIVISION > 0) {
      console.log('size dont match ATOMIC_TACT_DIVISION, ', size)
      $event.target.value = this.tacts[this.activeTact].sizeStr
      return
    }

    console.log(size)
    this.tacts[this.activeTact].sizeStr = size;
  }

  trackByTactValue(index: number, item: TactInfo) {
    return JSON.stringify(item);
  }

  protected readonly VERTICAL_TACT_MARGIN = VERTICAL_TACT_MARGIN;

  showSize(i: number): boolean {
    if (i == 0) {
      return true
    }

    return this.tacts[i].sizeStr !== this.tacts[i - 1].sizeStr;
  }

  protected readonly TACTS_WIDTH = TACTS_WIDTH;
}
