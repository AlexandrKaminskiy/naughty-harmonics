import {Component, OnInit} from '@angular/core';
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
    var audioBuffer = audioCtx.createBuffer(1, 50000, 100000);
    var channelData = audioBuffer.getChannelData(0);
    var spectre = this.mathService.carplusStrong(165);
    var spectre2 = this.mathService.carplusStrong(100);

    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = spectre[i] + spectre2[i]
    }

    const source = audioCtx.createBufferSource();

    source.buffer = audioBuffer;

    source.connect(audioCtx.destination);
    source.start(0, 0, 5);
  }

}
