import {Component, OnInit} from '@angular/core';
import {SoundService} from "../../../util/sound.service";

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent implements OnInit {

  constructor(public mathService: SoundService) {
  }

  ngOnInit() {
    console.log('asdasdasdasdads')
    console.log(Math.round((2 ** (2 / 12.0)) * 82.0));
  }

  playS() {

    const audioCtx = new AudioContext();
    const audioBuffer = audioCtx.createBuffer(1, 100000, 200000);
    const channelData = audioBuffer.getChannelData(0);
    const samples = this.mathService.karplusStrong(100);

    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = samples[i]
    }

    const source = audioCtx.createBufferSource();

    source.buffer = audioBuffer;

    source.connect(audioCtx.destination);
    source.start(0, 0, 5);
  }

}
