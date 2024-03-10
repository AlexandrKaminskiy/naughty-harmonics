import {NoteDto} from "./note";

export interface TactInfo {
  size: number
  notes: NoteDto[][]
  serialNumber: number
}
