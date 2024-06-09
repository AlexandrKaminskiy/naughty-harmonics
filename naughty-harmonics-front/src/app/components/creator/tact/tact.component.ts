import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {CordComponent} from "../cord/cord.component";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {NoteComponent} from "../note/note.component";
import {NoteDto} from "../../../dto/note";
import {UtilService} from "../../../util/utilService";
import {NoteAction} from "../../../dto/noteAction";
import {TactInfo} from "../../../dto/tactInfo";
import {NoteDurationService} from "../../../util/noteDurationService";
import {NotePauseComponent} from "../note-pause/note-pause.component";
import {NoteActionComponent} from "../note-action/note-action.component";
import {START_TACT_LENGTH} from "../../../util/constants";
import {TactPauseComponent} from "../tact-pause/tact-pause.component";
import {TooltipModule} from "ngx-bootstrap/tooltip";

@Component({
  selector: 'app-tact',
  standalone: true,
  imports: [
    CordComponent,
    NgForOf,
    NoteComponent,
    NgIf,
    NgStyle,
    NgOptimizedImage,
    NotePauseComponent,
    NoteActionComponent,
    TactPauseComponent,
    TooltipModule
  ],
  templateUrl: './tact.component.html',
  styleUrl: './tact.component.css'
})
export class TactComponent implements OnInit, AfterViewInit {

  @Input() sizeStr: string
  @Input() staveAcknowledged: boolean
  @Input() serialNumber: number
  @Input() showSize: boolean
  @Output() isFull: EventEmitter<any> = new EventEmitter<any>()
  @Output() tactInfo: EventEmitter<TactInfo> = new EventEmitter<TactInfo>()
  @Output() tactAction: EventEmitter<any> = new EventEmitter<any>()
  @Output() active: EventEmitter<any> = new EventEmitter<any>()

  @Input() notes: NoteDto[][]
  @Input() activeBorder: boolean

  @ViewChildren("note") children: QueryList<ElementRef>

  size: number


  constructor(public utilService: UtilService, public noteDurationService: NoteDurationService) {
  }

  ngAfterViewInit() {
    console.log(this.children)
    this.children.changes
      .subscribe((next: QueryList<ElementRef>) => {
        next.forEach(it => console.log('it.nativeElement.id'))
      });
  }

  ngOnInit() {
    console.log(this.notes)
    const parts = this.sizeStr.split('/');
    this.size = parseInt(parts[0]) * 32 / parseInt(parts[1])
    console.log(this.size)
    this.changeWarningBorder();
  }

  changeTactValue($event: any) {
    this.notes[$event.column][$event.row] = {value: $event.value, duration: $event.duration, functionType: $event.functionType}
    console.log($event)
    // console.log(document.activeElement);
    if ($event.value && $event.column == this.notes.length - 1) {
      this.addColumn(this.notes.length)
    }
    this.tactInfo.emit({notes: this.notes, serialNumber: this.serialNumber, sizeStr: this.sizeStr})
  }

  addColumn(pos: number) {
    if (this.getCurrentSize() >= this.size) {
      return
    }
    const duration = Math.pow(2, Math.floor(Math.log2(this.size - this.getCurrentSize())))
    this.notes.splice(pos, 0, this.utilService.createColumn(duration));
    this.checkFull()
  }

  removeColumn(pos: number) {
    if (this.notes.length == 1) {
      return
    }

    this.notes.splice(pos, 1);
  }

  handleAction($event: any) {
    switch ($event.action) {
      case NoteAction.ADD_COLUMN:
        this.addColumn($event.pos);
        break
      case NoteAction.REMOVE_COLUMN:
        this.removeColumn($event.pos);
        break
      case NoteAction.CHANGE_DURATION:
        this.notes[$event.pos].forEach((value, index, array) => {
          array[index] = {value: value.value, duration: $event.duration, functionType: $event.functionType}
        })
        this.checkFull()
        break
      case NoteAction.ERASE_COLUMN:
        this.notes[$event.pos].forEach((value, index, array) => {
          array[index] = {value: '', duration: array[index].duration, functionType: $event.functionType}
        })
        this.checkFull()
        break
    }
    this.tactInfo.emit({notes: this.notes, serialNumber: this.serialNumber, sizeStr: this.sizeStr})
  }

  getCurrentSize() {
    return this.notes.reduce((acc, it) => it[0].duration + acc, 0);
  }

  checkFull() {
    const sum = this.getCurrentSize()
    if (!this.staveAcknowledged && sum >= this.size) {
      this.staveAcknowledged = true
      this.isFull.emit({value: true, serialNumber: this.serialNumber})
    }
  }

  changeWarningBorder(): string {
    if (this.activeBorder) {
      return '4px solid rgba(112, 75, 255, .4)'
    }

    if (this.getCurrentSize() != this.size) {
      return '4px solid rgba(255, 0, 0, .4)'
    } else {
      return '4px solid rgba(0, 0, 0, .1)'
    }
  }

  getDurationOfColumn(i: number): number {
    return this.notes[i][0].duration
  }

  checkPauses(i: number): boolean {
    return !this.notes[i].some(it => it.value)
  }

  acknowledgeStaveActive() {
    this.active.emit({serialNumber: this.serialNumber})
  }

  protected readonly START_TACT_LENGTH = START_TACT_LENGTH;
}
