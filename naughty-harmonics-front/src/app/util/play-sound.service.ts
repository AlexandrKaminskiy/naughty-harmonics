import {Injectable} from "@angular/core";
import {SoundService} from "./sound.service";

@Injectable({
  providedIn: 'root'
})
export class PlaySoundService {

  constructor(public mathService: SoundService) {
  }

  public playSound(rates: number[]) {
    const audioCtx = new AudioContext();
    const audioBuffer = audioCtx.createBuffer(2, 200000, 200000);
    const channelData = audioBuffer.getChannelData(0);
    const channelData1 = audioBuffer.getChannelData(1);

    const sampleArrays = rates.map(it => this.mathService.karplusStrong(it));

    const samples = []
    for (let i = 0; i < channelData.length; i++) {
      let sample = 0
      for (let j = 0; j < sampleArrays.length; j++) {
        sample += sampleArrays[j][i]
      }
      samples.push(sample / sampleArrays.length)
    }


    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = samples[i]
    }

    for (let i = 0; i < channelData.length; i++) {
      channelData1[i] = samples[i]
    }

    const source = audioCtx.createBufferSource();

    source.buffer = audioBuffer;

    source.connect(audioCtx.destination);
    source.start(0, 0, 1);

  }
}
