import { Message } from "../modules/Discordeno/structures/message.ts";
import { cache } from "../modules/Discordeno/utils/cache.ts";
import { botID } from "../modules/Discordeno/module/client.ts";

import Embed from "../utils/Embed.ts";

import Command from "../interfaces/Command.ts";

const Ping: Command = {
  name: "latency",
  description: "Displays the latency of the bot.",
  aliases: ["ping"],
  exec: (db: any, message: Message, args: string[]) => {
    const startedTimestamp = Date.now();
    const embed = new Embed();
    embed.setAuthor(`${cache.guilds.get(message.guildID as string)?.members.get(botID)?.user.username}'s latencies`);
    embed.setColor(0x00FF00);
    embed.addField("Message latency", `${(Date.now() - startedTimestamp).toString()} milliseconds`);

    return ({ embed });
  }
};

export default Ping;