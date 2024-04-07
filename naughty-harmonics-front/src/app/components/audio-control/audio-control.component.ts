import {Component, EventEmitter} from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {TabComponent} from "../tab/tab.component";
import {PlayMusicAction} from "../../dto/playMusicAction";
import {StaveInfo} from "../../dto/staveInfo";
import {NgStyle} from "@angular/common";
import {MusicActionType} from "../../dto/musicActionType";

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
  handleMusicAction($event: PlayMusicAction) {
    switch ($event.action) {
      case MusicActionType.CONTINUE:
      case MusicActionType.STOP:
      case MusicActionType.PLAY: this.handlePlaying(); break
      case MusicActionType.SUSPEND:
    }
  }

  handlePlaying() {
    this.timer = setInterval(() => {
      this.left += 100;
    }, 1000)
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
