import { cache } from "../modules/Discordeno/utils/cache.ts";
import { editBotsStatus } from "../modules/Discordeno/utils/utils.ts";
import { ActivityType } from "../modules/Discordeno/types/activity.ts"
import { StatusType } from "../modules/Discordeno/types/discord.ts";
import { AloeDB } from "../modules/AloeDB/mod.ts";

import GuildData from "../interfaces/GuildData.ts";

export default async (db: AloeDB<GuildData>) => {
  const defaultPrefixes = new Array(Deno.env.get("PREFIX") as string);

  for (const guild of cache.guilds.array()) {
    if (!(await db.findOne({ id: guild.id }))) {
      await db.insertOne({
        id: guild.id,
        prefixes: defaultPrefixes
      });
    }
  }

  editBotsStatus(StatusType.Online, `${Deno.env.get("PREFIX")}help | ${cache.guilds.size} guilds`, ActivityType.Listening);

  console.log("Bot is started.");
}