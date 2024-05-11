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
    // const audioCtx = new AudioContext();
    // Стерео
    // var channels = 2;

// Создаёт пустой двухсекундный стерео-буфер
// с частотой звука AudioContext (sample rate)
//     var frameCount = audioCtx.sampleRate * 2.0;
//     var myArrayBuffer = audioCtx.createBuffer(
//       channels,
//       frameCount,
//       audioCtx.sampleRate,
//     );
//
//     for (var channel = 0; channel < channels; channel++) {
//       // Получаем массив данных канала
//       var nowBuffering = myArrayBuffer.getChannelData(channel);
//       for (var i = 0; i < frameCount; i++) {
//         // Math.random() находится в [0; 1.0]
//         // аудио должно быть в интервале [-1.0; 1.0]
//         nowBuffering[i] = Math.random() * 2 - 1;
//       }
//     }
//
//     // Получает AudioBufferSourceNode.
//     // AudioNode для проигрывания из AudioBuffer
//     var source = audioCtx.createBufferSource();
//
//     // устанавливает буфер в AudioBufferSourceNode
//     source.buffer = myArrayBuffer;
//
//     // присоединяет AudioBufferSourceNode к
//     // destination, чтобы мы могли слышать звук
//     source.connect(audioCtx.destination);
//
//     // Начать воспроизведение с источника
//     source.start();

    //
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
