import {Component} from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {TabComponent} from "../tab/tab.component";
import {PlayMusicAction} from "../../dto/playMusicAction";
import {StaveInfo} from "../../dto/staveInfo";
import {NgStyle} from "@angular/common";
import {MusicActionType} from "../../dto/musicActionType";
import {MusicPositionService} from "../../util/musicPositionService";
import {PlaySoundService} from "../../util/play-sound.service";
import {SliderMovementInfo} from "../../dto/sliderMovementInfo";

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
  playing: boolean;
  left: number = this.START_LEFT_OFFSET;
  timer: NodeJS.Timeout;
  timeouts: any[] = [];
  intervals: any[] = [];
  currentInterval: number
  playIntervals: SliderMovementInfo[]

  constructor(
    public musicPositionService: MusicPositionService,
    public playSoundService: PlaySoundService
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
    // console.log(this.staveInfo[0].tacts)
    const playIntervals = this.musicPositionService.calculateTime(this.staveInfo[0].tacts);
    this.currentInterval = 0;
    this.playIntervals = playIntervals;

    this.play()
  }

  private handleSuspend() {
    this.clearTimeoutsForSuspend();
  }

  private handleContinue() {
    this.currentInterval++
    this.play()
  }

  private handleStop() {
    this.clearTimeouts();
    this.left = this.START_LEFT_OFFSET;
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
        let currentInterval = setInterval(inc => {
          this.left += inc
          times--
          if (times <= 0) {
            clearInterval(currentInterval)
          }
        }, 10, this.playIntervals[i].speed)
        this.intervals.push(currentInterval)
      }, sliderDelay, i);
      this.timeouts.push(timeout)
      sliderDelay += this.playIntervals[i].time * 10
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
        .filter(it => it.value)
        .map(it => it.value)
        .map((it, index) => {
          switch (index) {//todo
            case 0:
              return 100;
            case 1:
              return 140;
            case 2:
              return 180;
            case 3:
              return 220;
            case 4:
              return 260;
            case 5:
              return 300;
            default:
              throw Error()
          }
        })
    }).flat()
  }




  handleReset() {
    this.left = 0
  }

  updateStaves($event: StaveInfo[]) {
    this.staveInfo = $event;
  }
}
