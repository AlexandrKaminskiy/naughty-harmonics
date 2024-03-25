import {TactActionHandler} from "./tactActionHandler";
import {NoteAction} from "../dto/noteAction";

export class AddActionHandlerImpl implements TactActionHandler{
  actionType(): NoteAction {
    return NoteAction.ADD_COLUMN;
  }

  handle(): void {
    console.log('add column')
  }

}
