import { Message } from "../modules/Discordeno/structures/message.ts";
import { MessageContent } from "../modules/Discordeno/types/channel.ts";

interface Command {
  name: string;
  description: string;
  aliases: (RegExp | string)[];
  category: string;
  permissions: ((msg: Message) => (Promise<boolean> | boolean))[]
  exec: (db: any, message: Message, args: string[]) => (MessageContent | Promise<MessageContent>);
}

export default Command;