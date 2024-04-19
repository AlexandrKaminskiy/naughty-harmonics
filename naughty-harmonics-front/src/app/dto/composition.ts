import {NoteFunctionType} from "./noteFunctionType";
import {StaveInfo} from "./staveInfo";

export interface Composition {
  id: number;
  staves: StaveInfo[];
  name: string;
  complexity: number;
  description: string;
  bpm: number;
  videoLink: string;
}
