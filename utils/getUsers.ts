import Collection from "../modules/Discordeno/utils/collection.ts";
import { cache } from "../modules/Discordeno/utils/cache.ts";
import { UserPayload } from "../modules/Discordeno/types/guild.ts";

export default (() => {
  const users = new Collection<string, UserPayload>();

  for (const guild of cache.guilds.array()) {
    for (const member of guild.members.array()) {
      users.set(member.user.id, member.user);
    }
  }

  return users;
});