import {Component, EventEmitter, Inject} from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {TabComponent} from "../tab/tab.component";
import {PlayMusicAction} from "../../dto/playMusicAction";
import {StaveInfo} from "../../dto/staveInfo";
import {NgStyle} from "@angular/common";
import {MusicActionType} from "../../dto/musicActionType";
import {MusicPositionService} from "../../util/musicPositionService";
import {concatMap, delay, from, interval, timeout, timer} from "rxjs";
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

  constructor(
    public musicPositionService: MusicPositionService,
    public playSoundService: PlaySoundService
  ) {
  }

  handleMusicAction($event: PlayMusicAction) {
    switch ($event.action) {
      case MusicActionType.CONTINUE:
      case MusicActionType.STOP:
      case MusicActionType.PLAY:
        this.handlePlaying();
        break
      case MusicActionType.SUSPEND:
    }
  }

  handlePlaying() {
    this.left = this.START_LEFT_OFFSET;
    console.log(this.staveInfo[0].tacts)
    const playIntervals = this.musicPositionService.calculateTime(this.staveInfo[0].tacts);
    let timeout = 0;
    for (let i = 0; i < playIntervals.length; i++) {

      setTimeout(i => {
        let times = playIntervals[i].time
        const notes = this.getNotes(playIntervals[i]);
        if (notes.length > 0) {
          this.playSoundService.playSound(notes)
        }
        console.log(timeout)
        let interval = setInterval(inc => {
          this.left += inc
          times--
          if (times <= 0) {
            clearInterval(interval)
          }
        }, 10, playIntervals[i].speed)

      }, timeout, i)
      timeout += playIntervals[i].time * 10
    }

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


  handleStop() {
    clearTimeout(this.timer)
  }

  handleReset() {
    this.left = 0
  }

  updateStaves($event: StaveInfo[]) {
    this.staveInfo = $event;
  }
}
