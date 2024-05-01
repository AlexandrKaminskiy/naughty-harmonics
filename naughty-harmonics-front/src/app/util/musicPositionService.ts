import {Injectable} from "@angular/core";
import {TactInfo} from "../dto/tactInfo";
import {SliderMovementInfo} from "../dto/sliderMovementInfo";
import {NOTE_LENGTH, START_TACT_LENGTH} from "./constants";

@Injectable({
  providedIn: 'root'
})
export class MusicPositionService {

  private static ENTIRE_NOTE: number = 100

  public calculateTime(tacts: TactInfo[], bpm: number): SliderMovementInfo[] {
    const movements: SliderMovementInfo[] = [];

    const entireNote = 60000 / bpm / 4

    for (let i = 0; i < tacts.length; i++) {
      if (i == 0 || tacts[i].sizeStr != tacts[i - 1].sizeStr) {
        movements.push({speed: START_TACT_LENGTH, time: 0})
      }
      tacts[i].notes.forEach((it, index) => {
        const time = it[0].duration / 32.0 * entireNote
        const speed = NOTE_LENGTH / time
        let jb = i + 1 < tacts.length && index + 1 == tacts[i].notes.length && tacts[i].topLeftCorner != tacts[i + 1].topLeftCorner
        let endOfTact = index + 1 == tacts[i].notes.length
        movements.push( {speed: speed, time: time, tact: tacts[i].serialNumber, note: index, jumpBelow: jb, jumpHeight: tacts[i].height, endOfTact: endOfTact} )
      })
    }
    return movements
  }
}
