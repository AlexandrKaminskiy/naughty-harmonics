import {NoteAction} from "../dto/noteAction";

export interface TactActionHandler {
  handle(): void
  actionType(): NoteAction
}
