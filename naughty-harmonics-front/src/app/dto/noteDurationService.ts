import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NoteDurationService {
  public SEMIBREVE = {duration: 32, color: 'purple'}
  public HALF_NOTE = {duration: 16, color: 'blue'}
  public EIGHTH_NOTE = {duration: 8, color: 'green'}
  public SIXTEENTH_NOTE = {duration: 4, color: 'yellow'}
  public THIRTY_TWO_NOTE = {duration: 2, color: 'orange'}
  public SIXTY_FOUR_NOTE = {duration: 1, color: 'red'}

  getColorByDuration(duration: number) {
    switch (duration) {
      case 1: return this.SIXTY_FOUR_NOTE.color
      case 2: return this.THIRTY_TWO_NOTE.color
      case 4: return this.SIXTEENTH_NOTE.color
      case 8: return this.EIGHTH_NOTE.color
      case 16: return this.HALF_NOTE.color
      case 32: return this.SEMIBREVE.color
      default: throw new Error("no duration")
    }
  }
}
