import {ChangeDetectorRef, Component, HostListener, inject, OnInit} from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {TabComponent} from "../tab/tab.component";
import {PlayMusicAction} from "../../../dto/playMusicAction";
import {StaveInfo} from "../../../dto/staveInfo";
import {NgStyle} from "@angular/common";
import {MusicActionType} from "../../../dto/musicActionType";
import {MusicPositionService} from "../../../util/musicPositionService";
import {PlaySoundService} from "../../../util/play-sound.service";
import {SliderMovementInfo} from "../../../dto/sliderMovementInfo";
import {SLIDER_NORMALIZATION, START_LEFT_OFFSET, START_TOP_OFFSET, VERTICAL_TACT_MARGIN} from "../../../util/constants";
import {FrequencyService} from "../../../util/frequencyService";
import {SliderContext} from "../../../dto/sliderContext";
import {ApiService} from "../../../util/apiService";
import {ActivatedRoute, Router} from "@angular/router";
import {NoteDto} from "../../../dto/note";
import {UtilService} from "../../../util/utilService";
import {ClientDto} from "../../../dto/clientDto";
import {ClientService} from "../../../util/clientService";
import {CustomAlertComponent} from "../../pages/custom-alert/custom-alert.component";
import {AlertModule} from "ngx-bootstrap/alert";
import {NgToastModule, NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-audio-control',
  standalone: true,
  imports: [
    SideBarComponent,
    TabComponent,
    NgStyle,
    CustomAlertComponent,
    AlertModule,
    NgToastModule
  ],
  templateUrl: './audio-control.component.html',
  styleUrl: './audio-control.component.css'
})
export class AudioControlComponent implements OnInit {

  visibleStave: number = 0
  staveInfo: StaveInfo[]
  playing: boolean = false;
  paused: boolean = false;
  bpm: number = 300
  id: number
  client: ClientDto
  compositionName: string = '';
  videoLink: string = '';
  compositionComplexity: number = 5;
  compositionDescription: string = '';

  constructor(
    public musicPositionService: MusicPositionService,
    public playSoundService: PlaySoundService,
    public frequencyService: FrequencyService,
    public apiService: ApiService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public clientService: ClientService,
    public utilService: UtilService,
    public ngToastService: NgToastService
  ) {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.apiService.findById(this.id).subscribe(
          it => {
            this.compositionName = it.name
            this.compositionComplexity = it.complexity
            this.compositionDescription = it.description
            this.staveInfo = it.staves
            this.videoLink = it.videoLink
            this.staveInfo.forEach(it => it.sliderContext = this.utilService.createSliderContext())
          },
          () => this.router.navigate(['not-found']))
      }
    })
    this.clientService.getCurrentUser().subscribe(it => this.client = it)
  }

  getTopStaveOffset() {
    if (this.staveInfo && this.staveInfo.length != 0 && this.staveInfo[this.visibleStave] && this.staveInfo[this.visibleStave].sliderContext) {
      return this.staveInfo[this.visibleStave].sliderContext.top
    }
    return START_TOP_OFFSET
  }

  getLeftStaveOffset() {
    if (this.staveInfo && this.staveInfo.length != 0 && this.staveInfo[this.visibleStave] && this.staveInfo[this.visibleStave].sliderContext) {
      return this.staveInfo[this.visibleStave].sliderContext.left
    }
    return START_LEFT_OFFSET
  }

  handleMusicAction($event: PlayMusicAction) {
    switch ($event.action) {
      case MusicActionType.CONTINUE:
        this.handleContinue();
        break
      case MusicActionType.STOP:
        this.handleStop();
        break
      case MusicActionType.PLAY:
        this.handleStartPlay();
        break
      case MusicActionType.SUSPEND:
        this.handleSuspend();
        break
    }
  }

  handleStartPlay() {
    this.clearTimeouts();
    // console.log(this.staveInfo[0].tacts)
    this.staveInfo.map((it, index) => {
      it.sliderContext.left = START_LEFT_OFFSET
      it.sliderContext.top = START_TOP_OFFSET
      it.sliderContext.playIntervals = this.musicPositionService.calculateTime(it.tacts, this.bpm)
      it.sliderContext.currentInterval = 0
    })

    this.changeFlags(true, false)

    this.staveInfo.forEach(it => {
      this.play(it)
    })
  }

  private handleSuspend() {
    this.changeFlags(false, true)
    this.clearTimeoutsForSuspend();
  }

  private handleContinue() {
    this.changeFlags(true, false)
    this.staveInfo.forEach(it => {
      it.sliderContext.currentInterval++
      this.play(it)
    })
  }

  private handleStop() {
    this.changeFlags(false, false)

    this.clearTimeouts();

    this.staveInfo.forEach(it => {
      it.sliderContext.left = START_LEFT_OFFSET;
      it.sliderContext.top = START_TOP_OFFSET;
      it.sliderContext.currentInterval = 0;
      it.sliderContext.playIntervals = [];
    })

  }

  private play(si: StaveInfo) {
    let sliderDelay = 0;
    for (let i = si.sliderContext.currentInterval; i < si.sliderContext.playIntervals.length; i++) {
      const timeout = setTimeout(i => {
        si.sliderContext.currentInterval = i;
        let times = Math.floor(si.sliderContext.playIntervals[i].time)
        let fractional = si.sliderContext.playIntervals[i].time % 1
        const notes = this.getNotes(si.sliderContext.playIntervals[i], si);
        if (notes.length > 0) {
          this.playSoundService.playSound(notes)
        }
        console.log(sliderDelay)
        let interval = setInterval((inc, shouldNormalize) => {
          si.sliderContext.left += inc
          times--
          if (times <= 0) {
            si.sliderContext.left += fractional * inc
            this.handleJump(si.sliderContext, i)
            if (si.sliderContext.currentInterval == si.sliderContext.playIntervals.length - 1) {
              this.playing = false
            }
            if (shouldNormalize) {
              si.sliderContext.left += SLIDER_NORMALIZATION
            }
            clearInterval(interval)
          }
        }, 10, si.sliderContext.playIntervals[i].speed, si.sliderContext.playIntervals[i].endOfTact)
        si.sliderContext.intervals.push(interval)
      }, sliderDelay, i);
      si.sliderContext.timeouts.push(timeout)
      sliderDelay += si.sliderContext.playIntervals[i].time * 10
    }
  }

  private handleJump(sc: SliderContext, i: number) {

    if (sc.playIntervals[i].jumpBelow) {
      sc.left = START_LEFT_OFFSET
      sc.top += sc.playIntervals[i].jumpHeight! + VERTICAL_TACT_MARGIN
    }
  }

  private clearTimeouts() {
    this.staveInfo.forEach(it => {
      it.sliderContext.timeouts.forEach(it => clearTimeout(it))
      it.sliderContext.timeouts = []
      it.sliderContext.intervals.forEach(it => clearInterval(it))
      it.sliderContext.intervals = []
    })


  }

  private clearTimeoutsForSuspend() {
    this.staveInfo.forEach(it => {
      it.sliderContext.timeouts.forEach(it => clearTimeout(it))
      it.sliderContext.timeouts = []
    })
  }

  getNotes(slideMovementInfo: SliderMovementInfo, staveInfo: StaveInfo): number[] {
    if (slideMovementInfo.tact == null || slideMovementInfo.note == null) {
      return []
    }
    let notes = staveInfo.tacts[slideMovementInfo.tact!!].notes[slideMovementInfo.note!!];
    return notes
      .map(it => it.value)
      .map((it, index) => {
        if (!it) return null
        const number = this.frequencyService.calculateFrecuency(index, +it);
        console.log(number)
        return number
      })
      .filter(it => it)
      .map(it => it!!)
  }

  changeFlags(playing: boolean, paused: boolean) {
    this.playing = playing
    this.paused = paused
  }

  updateStaves($event: StaveInfo[]) {
    this.staveInfo = $event;
  }

  changeVisibleStave($event: number) {
    this.visibleStave = $event
  }

  setBpm($event: any) {
    this.bpm = +$event.target.value
    console.log(this.bpm)
  }

  saveSong($event: any) {
    const composition = {
      name: this.compositionName,
      bpm: +this.bpm,
      complexity: +this.compositionComplexity,
      description: this.compositionDescription,
      videoLink: this.videoLink,
      staves: this.staveInfo,

    };

    if (!this.id) {
      this.apiService.saveSheet(composition).subscribe(it => this.id = it)
    } else {
      this.apiService.updateSheet(this.id, composition).subscribe()
    }
    this.ngToastService.info(`Song was saved!`, "INFO", 5000)

    console.log(this.id)
  }

  normalizeStaves() {
    this.staveInfo.forEach(it => it.tacts.forEach(it => it.notes = this.check(it.notes)))
    console.log(this.staveInfo)
  }

  check(arr: NoteDto[][]): NoteDto[][] {
    let isValid = true;
    for (let i = 0; i < arr.length - 1; i++) {
      if (!arr[i].some(it => it.value) &&
        !arr[i + 1].some(it => it.value) &&
        arr[i][0].duration == arr[i + 1][0].duration &&
        arr[i][0].duration + arr[i + 1][0].duration <= 32
      ) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      return arr;
    }
    const result: NoteDto[][] = [];
    for (let i = 0; i < arr.length; i++) {
      if (i + 1 != arr.length &&
        !arr[i].some(it => it.value) &&
        !arr[i + 1].some(it => it.value) &&
        arr[i][0].duration === arr[i + 1][0].duration &&
        arr[i][0].duration + arr[i + 1][0].duration <= 32) {
        result.push(this.utilService.createColumn(arr[i][0].duration * 2, ''));
        i++;
      } else {
        result.push(arr[i]);
      }
    }
    return this.check(result);
  }

  setCompositionName($event: any) {
    this.compositionName = $event.target.value
  }

  setVideoLink($event: any) {
    this.videoLink = $event.target.value
  }

  setComplexity($event: any) {
    this.compositionComplexity = $event.target.value
  }

  setDescription($event: any) {
    this.compositionDescription = $event.target.value
  }

  publishComposition() {

    this.apiService.publishSheet(this.id).subscribe(it => {
      if (it.isUnique) {
        this.ngToastService.info(`Song was published! Unique percent ${it.maxCorrelationValue * 100}%`, "INFO", 5000)
      } else {
        this.ngToastService.danger(`Song wasn't published! Unique percent ${it.maxCorrelationValue * 100}%`, "INFO", 5000)
      }
    })
  }
}
