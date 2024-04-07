import {Component} from '@angular/core';
import {MathService} from "../../util/mathService";

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent {

  constructor(public mathService: MathService) {
  }

  playS() {

    const audioCtx = new AudioContext();
    const audioBuffer = audioCtx.createBuffer(1, 100000, 200000);
    const channelData = audioBuffer.getChannelData(0);
    const samples = this.mathService.carplusStrong(100);

    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = samples[i]
    }

    const source = audioCtx.createBufferSource();

    source.buffer = audioBuffer;

    source.connect(audioCtx.destination);
    source.start(0, 0, 5);
  }

}
