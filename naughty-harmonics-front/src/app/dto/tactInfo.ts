import {NoteDto} from "./note";

export interface TactInfo {
  sizeStr: string
  notes: NoteDto[][]
  serialNumber: number
  topLeftCornerY?: number
  topLeftCornerX?: number
  width?: number
  height?: number
}
