import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {

  readonly notes = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'H'
  ]

  readonly tuning = [
    {note: 'E', frequency: 330},
    {note: 'H', frequency: 247},
    {note: 'G', frequency: 196},
    {note: 'D', frequency: 147},
    {note: 'A', frequency: 110},
    {note: 'E', frequency: 82},
  ]

  calculateFrecuency(str: number, fret: number) {
    console.log(str, ' ', fret)
    return Math.round((2 ** (fret / 12.0)) * this.tuning[str].frequency)
  }
}
