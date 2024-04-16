import {Injectable} from "@angular/core";
import {TactInfo} from "../dto/tactInfo";
import {SliderMovementInfo} from "../dto/sliderMovementInfo";
import {NOTE_LENGTH, START_TACT_LENGTH} from "./constants";

@Injectable({
  providedIn: 'root'
})
export class MusicPositionService {

  private static ENTIRE_NOTE: number = 1000

  public calculateTime(tacts: TactInfo[]): SliderMovementInfo[] {
    const movements: SliderMovementInfo[] = [];

    for (let i = 0; i < tacts.length; i++) {
      if (i == 0 || tacts[i].sizeStr != tacts[i - 1].sizeStr) {
        movements.push({speed: START_TACT_LENGTH, time: 0})
      }
      tacts[i].notes.forEach((it, index) => {
        const time = it[0].duration / 32.0 * MusicPositionService.ENTIRE_NOTE
        const speed = NOTE_LENGTH / time
        movements.push( {speed: speed, time: time, tact: tacts[i].serialNumber, note: index} )
      })
    }
    return movements
  }
}
