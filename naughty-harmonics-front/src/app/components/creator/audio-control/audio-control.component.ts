import {Component} from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {TabComponent} from "../tab/tab.component";
import {PlayMusicAction} from "../../../dto/playMusicAction";
import {StaveInfo} from "../../../dto/staveInfo";
import {NgStyle} from "@angular/common";
import {MusicActionType} from "../../../dto/musicActionType";
import {MusicPositionService} from "../../../util/musicPositionService";
import {PlaySoundService} from "../../../util/play-sound.service";
import {SliderMovementInfo} from "../../../dto/sliderMovementInfo";
import {SLIDER_NORMALIZATION, VERTICAL_TACT_MARGIN} from "../../../util/constants";
import {FrequencyService} from "../../../util/frequencyService";
import {SliderContext} from "../../../dto/sliderContext";

@Component({
  selector: 'app-audio-control',
  standalone: true,
  imports: [
    SideBarComponent,
    TabComponent,
    NgStyle
  ],
  templateUrl: './audio-control.component.html',
  styleUrl: './audio-control.component.css'
})
export class AudioControlComponent {

  readonly START_LEFT_OFFSET = 10;
  readonly START_TOP_OFFSET = 10;

  visibleStave: number = 0
  staveInfo: StaveInfo[]
  playing: boolean = false;
  paused: boolean = false;
  bpm: number = 300

  // sliderContexts: SliderContext[] = []


  constructor(
    public musicPositionService: MusicPositionService,
    public playSoundService: PlaySoundService,
    public frequencyService: FrequencyService
  ) {
  }

  getTopStaveOffset() {
    if (this.staveInfo) {
      return this.staveInfo[this.visibleStave].sliderContext.top
    }
    return this.START_TOP_OFFSET
  }

  getLeftStaveOffset() {
    if (this.staveInfo) {
      return this.staveInfo[this.visibleStave].sliderContext.left
    }
    return this.START_LEFT_OFFSET
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
      it.sliderContext.left = this.START_LEFT_OFFSET
      it.sliderContext.top = this.START_TOP_OFFSET
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
      it.sliderContext.left = this.START_LEFT_OFFSET;
      it.sliderContext.top = this.START_TOP_OFFSET;
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
      sc.left = this.START_LEFT_OFFSET
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
}
