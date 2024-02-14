import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent implements OnInit{

  ngOnInit(): void {

  }

  playS() {



    const audioCtx = new AudioContext();


    const real = new Float32Array(2);
    const imag = new Float32Array(2);
    const osc = audioCtx.createOscillator();

    real[0] = 0;
    imag[0] = 0;
    real[1] = 1;
    imag[1] = 0;

    const wave = audioCtx.createPeriodicWave(real, imag);

    osc.setPeriodicWave(wave);

    osc.connect(audioCtx.destination);

    osc.start();
    osc.stop(2);

  }

}
