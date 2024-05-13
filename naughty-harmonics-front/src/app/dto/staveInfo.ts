import {TactInfo} from "./tactInfo";
import {SliderContext} from "./sliderContext";
import {Instrument} from "./instrument";

export class StaveInfo {
  instrument: Instrument
  tacts: TactInfo[]
  sliderContext: SliderContext
}
