import {SliderMovementInfo} from "./sliderMovementInfo";

export class SliderContext {
  top: number = 10
  left: number = 10
  currentInterval: number
  playIntervals: SliderMovementInfo[]
  intervals: any[]
  timeouts: any[]
}
