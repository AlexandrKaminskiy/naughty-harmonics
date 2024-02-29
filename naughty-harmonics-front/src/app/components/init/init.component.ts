import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent implements OnInit {

  ngOnInit(): void {

  }

  playS() {

    const audioCtx = new AudioContext();

    const real = new Float32Array(2);
    const imag = new Float32Array(2);
    const osc = audioCtx.createOscillator();
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    osc1.type = "sine"
    osc1.frequency.value = 1000;
    osc2.type = "sawtooth"
    osc2.frequency.value = 500;

    real[0] = 1;
    imag[0] = 1;
    real[1] = 0.5;
    real[1] = 0.5;
    imag[1] = 1;
    imag[1] = 1;

    const wave = audioCtx.createPeriodicWave(real, imag);
    // audioCtx.createConvolver();

    osc.setPeriodicWave(wave);

    osc.connect(audioCtx.destination);
    // osc1.connect(audioCtx.destination);
    // osc2.connect(audioCtx.destination);

    // osc2.start()
    // osc1.start()
    osc.start();
    // osc2.stop(0.5)
    // osc1.stop(0.5)
    osc.stop(0.5);

  }

}
