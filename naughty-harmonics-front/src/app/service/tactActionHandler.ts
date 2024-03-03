import {Action} from "../dto/action";

export interface TactActionHandler {
  handle(): void
  actionType(): Action
}
