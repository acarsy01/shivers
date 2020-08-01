import { Message } from "../modules/Discordeno/structures/message.ts";
import { cache } from "../modules/Discordeno/utils/cache.ts";
import { botID } from "../modules/Discordeno/module/client.ts";

import Embed from "../utils/Embed.ts";
import getUsers from "../utils/getUsers.ts";

import Command from "../interfaces/Command.ts";

const Info: Command = {
  name: "about",
  description: "Displays information of the bot.",
  aliases: [/^info(rmation)?$/g],
  permissions: [],
  category: "utility",
  exec: (async (db: any, message: Message, args: string[]) => {
    const embed = new Embed();
    embed.setAuthor(`Information about ${cache.guilds.get(message.guildID as string)?.members.get(botID)?.user.username}`);
    embed.setColor(0x00FF00);
    embed.addField("Servers", cache.guilds.size.toString(), true);
    embed.addField("Channels", cache.channels.size.toString(), true);
    embed.addField("Users", getUsers().size.toString(), true);
    embed.addField("Libraries", [
      `shivers@${Deno.env.get("VERSION")}`,
      `[deno@${Deno.version.deno}](https://deno.land)`,
      `[typescript@${Deno.version.typescript}](https://www.typescriptlang.org/)`,
      `[discordeno@master](https://github.com/Skillz4Killz/Discordeno)`
    ].join("\n"), false);

    return ({ embed });
  }),
};

export default Info;