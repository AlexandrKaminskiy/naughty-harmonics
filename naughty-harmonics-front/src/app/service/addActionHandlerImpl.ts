import {TactActionHandler} from "./tactActionHandler";
import {Action} from "../dto/action";

export class AddActionHandlerImpl implements TactActionHandler{
  actionType(): Action {
    return Action.ADD_COLUMN;
  }

  handle(): void {
    console.log('add column')
  }

}
