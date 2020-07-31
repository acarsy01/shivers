import { Message } from "../modules/Discordeno/structures/message.ts";
import { MessageContent } from "../modules/Discordeno/types/channel.ts";

interface Command {
  name: string;
  description: string;
  aliases: (RegExp | string)[];
  exec: (db: any, message: Message, args: string[]) => MessageContent;
}

export default Command;