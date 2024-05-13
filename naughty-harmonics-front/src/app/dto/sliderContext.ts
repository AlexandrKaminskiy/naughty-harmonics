import {SliderMovementInfo} from "./sliderMovementInfo";
import {TabComponent} from "../components/creator/tab/tab.component";
import {START_LEFT_OFFSET, START_TOP_OFFSET} from "../util/constants";

export class SliderContext {
  top: number = START_TOP_OFFSET
  left: number = START_LEFT_OFFSET
  currentInterval: number
  playIntervals: SliderMovementInfo[]
  intervals: any[]
  timeouts: any[]
}
