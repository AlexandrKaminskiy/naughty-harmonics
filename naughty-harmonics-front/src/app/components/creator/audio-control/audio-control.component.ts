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
import {VERTICAL_TACT_MARGIN} from "../../../util/constants";
import {FrequencyService} from "../../../util/frequencyService";

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

  staveInfo: StaveInfo[]
  top: number = this.START_TOP_OFFSET
  playing: boolean = false;
  paused: boolean = false;
  left: number = this.START_LEFT_OFFSET;
  timeouts: any[] = [];
  intervals: any[] = [];
  currentInterval: number
  playIntervals: SliderMovementInfo[]
  bpm: number = 300

  constructor(
    public musicPositionService: MusicPositionService,
    public playSoundService: PlaySoundService,
    public frequencyService: FrequencyService
  ) {
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
    this.left = this.START_LEFT_OFFSET;
    this.top = this.START_TOP_OFFSET;
    // console.log(this.staveInfo[0].tacts)
    const playIntervals = this.musicPositionService.calculateTime(
      this.bpm,
      this.staveInfo[0].tacts
    );
    this.currentInterval = 0;
    this.playIntervals = playIntervals;
    this.changeFlags(true, false)
    this.play()
  }

  private handleSuspend() {
    this.changeFlags(false, true)
    this.clearTimeoutsForSuspend();
  }

  private handleContinue() {
    this.changeFlags(true, false)
    this.currentInterval++
    this.play()
  }

  private handleStop() {
    this.changeFlags(false, false)

    this.clearTimeouts();
    this.left = this.START_LEFT_OFFSET;
    this.top = this.START_TOP_OFFSET;
    this.currentInterval = 0;
    this.playIntervals = [];
  }

  private play() {
    let sliderDelay = 0;
    for (let i = this.currentInterval; i < this.playIntervals.length; i++) {
      const timeout = setTimeout(i => {
        this.currentInterval = i;
        let times = this.playIntervals[i].time
        const notes = this.getNotes(this.playIntervals[i]);
        if (notes.length > 0) {
          this.playSoundService.playSound(notes)
        }
        console.log(sliderDelay)
        let interval = setInterval(inc => {
          this.left += inc
          times--
          if (times <= 0) {
            this.handleJump(i)
            this.normalizeX(i)

            if (this.currentInterval == this.playIntervals.length - 1) {
              this.playing = false
            }
            clearInterval(interval)
          }
        }, 10, this.playIntervals[i].speed)
        this.intervals.push(interval)
      }, sliderDelay, i);
      this.timeouts.push(timeout)
      sliderDelay += this.playIntervals[i].time * 10
    }
  }

  private handleJump(i: number) {
    if (this.playIntervals[i].jumpBelow) {
      this.left = this.START_LEFT_OFFSET
      this.top += this.playIntervals[i].jumpHeight! + VERTICAL_TACT_MARGIN
    }
  }

  private normalizeX(i: number) {
    if (this.playIntervals[i].normalizedX) {
      this.left = this.playIntervals[i].normalizedX!!
    }
  }

  private clearTimeouts() {
    this.timeouts.forEach(it => clearTimeout(it))
    this.timeouts = []
    this.intervals.forEach(it => clearInterval(it))
    this.intervals = []
  }

  private clearTimeoutsForSuspend() {
    this.timeouts.forEach(it => clearTimeout(it))
    this.timeouts = []
  }

  getNotes(slideMovementInfo: SliderMovementInfo): number[] {
    if (slideMovementInfo.tact == null || slideMovementInfo.note == null) {
      return []
    }
    return this.staveInfo.map((stave, index) => {
      let notes = stave.tacts[slideMovementInfo.tact!!].notes[slideMovementInfo.note!!];
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
    }).flat()
  }

  changeFlags(playing: boolean, paused: boolean) {
    this.playing = playing
    this.paused = paused
  }

  handleReset() {
    this.left = 0
  }

  updateStaves($event: StaveInfo[]) {
    this.staveInfo = $event;
  }

  setBpm($event: any) {
    this.bpm = +$event.target.value
    console.log(this.bpm)
  }
}
