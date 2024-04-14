import {NoteDto} from "./note";

export interface TactInfo {
  sizeStr: string
  notes: NoteDto[][]
  serialNumber: number
  topLeftCorner?: number
}
