import { Guild } from "../modules/Discordeno/structures/guild.ts";
import { fetchMembers } from "../modules/Discordeno/handlers/guild.ts";

export default (async (db: unknown, guild: Guild) => {
  await fetchMembers(guild);
});