import { Message } from "../modules/Discordeno/structures/message.ts";

import Embed from "../utils/Embed.ts";

import Command from "../interfaces/Command.ts";
import { awaitMessages } from "../utils/messageCollector.ts";

const Info: Command = {
  name: "help",
  description: "Displays commands of the bot.",
  aliases: [/^help$/g],
  permissions: [],
  category: "utility",
  exec: (async (db: any, message: Message, args: string[]) => {
    const messages = await awaitMessages(message.channel, ((msg) => msg.author.id === message.author.id), {
      time: 10000,
      maxMatches: 1
    });
    console.log(messages);

    if (messages.length) {
      console.log(messages[0].content);
    } else {
      console.log("yok işte lan");
    }

    return ({
      content: "ok"
    });
  })
};

export default Info;