import { MessagesErrors } from "./errors";
import { MessagesLabels } from "./labels";
import { MessagesMenu } from "./menu";
import { MessagesTables } from "./tables";

export interface PlatformMessages {
  menu: MessagesMenu;
  error: MessagesErrors;
  labels: MessagesLabels;
  tables: MessagesTables
}
