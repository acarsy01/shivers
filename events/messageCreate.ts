import { AloeDB } from "../modules/AloeDB/mod.ts";

import { botID } from "../modules/Discordeno/module/client.ts";
import { Message } from "../modules/Discordeno/structures/message.ts";
import { sendMessage } from "../modules/Discordeno/handlers/channel.ts";
import { sendDirectMessage } from "../modules/Discordeno/handlers/member.ts";

import { messageListening, messageCollectors } from "../utils/messageCollector.ts";
import botCommands from "../utils/botCommands.ts";

import GuildData from "../interfaces/GuildData.ts";
import Command from "../interfaces/Command.ts";

export default (async (db: AloeDB<GuildData>, message: Message) => {
  if (messageListening) {
    for (const collector of messageCollectors) {
      collector.verify(message);
    }
  } else {
    if (typeof message.guildID !== "undefined") {
      const prefixes = (await db.findOne({ id: message.guildID }) as Readonly<GuildData>).prefixes;
      const prefixRegex = message.content.match(new RegExp(`^(${prefixes.join("|").replace(new RegExp("\\?", "g"), "\?")})`));
      const mentionRegex = message.content.match(new RegExp(`^<@!?${botID}( )?`));
      let commandName: string = "";
      let args: string[] = [];
      if (!!prefixRegex) {
        const prefix = (prefixRegex as string[])[0];
        commandName = message.content.slice(prefix.length).split(" ")[0];
        args = message.content.slice(prefix.length).split(" ").slice(1);
      } else if (!!mentionRegex) {
        const mention = (mentionRegex as string[])[0];
        commandName = message.content.slice(mention.length).split(" ")[0];
        args = message.content.slice(mention.length).split(" ").slice(1);
      }

      if (botCommands.has(commandName) || botCommands.some((command) => command.aliases.some((alias) => commandName.match(alias) || (alias === commandName)))) {
        const command = (botCommands.get(commandName) || botCommands.find((command) => (command as Command).aliases.some((alias) => commandName.match(alias) || (alias === commandName)))) as Command;

        for (const permissionFn of command.permissions) {
          if (!(await permissionFn(message))) {
            return;
          }
        }

        await sendMessage(message.channel, (await command.exec(db, message, args)));
      }
    } else {
      await sendDirectMessage(message.author.id, {
        content: "You can't use the bot in direct messages."
      });
    }
  }
});