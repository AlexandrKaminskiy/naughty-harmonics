import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlayMusicAction} from "../../../dto/playMusicAction";
import {MusicActionType} from "../../../dto/musicActionType";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  @Output() playMusicAction = new EventEmitter<PlayMusicAction>();
  @Output() saveEmitter = new EventEmitter();
  @Output() normalizeEmitter = new EventEmitter();
  @Output() publishEmitter = new EventEmitter();
  @Input() playing: boolean
  @Input() paused: boolean

  play() {
    this.playMusicAction.emit({action: MusicActionType.PLAY, reset: true})
  }

  stop() {
    this.playMusicAction.emit({action: MusicActionType.STOP, reset: true})
  }

  suspend() {
    this.playMusicAction.emit({action: MusicActionType.SUSPEND, reset: false})
  }

  continue() {
    this.playMusicAction.emit({action: MusicActionType.CONTINUE, reset: false})
  }

  save() {
    this.saveEmitter.emit();
  }

  normalize() {
    this.normalizeEmitter.emit();
  }

  publish() {
    this.publishEmitter.emit();
  }
}
