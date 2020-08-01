import { AloeDB } from "./modules/AloeDB/mod.ts";

import { load as envLoad } from "./modules/denv/mod.ts";

import createClient from "./modules/Discordeno/module/client.ts";
import { EventHandlers, Intents } from "./modules/Discordeno/types/options.ts";

import ready from "./events/ready.ts";
import messageCreate from "./events/messageCreate.ts";
import guildCreate from "./events/guildCreate.ts";
import guildMemberAdd from "./events/guildMemberAdd.ts";
import guildMemberRemove from "./events/guildMemberRemove.ts";
import guildMemberUpdate from "./events/guildMemberUpdate.ts";

await envLoad(".env");

const db = new AloeDB(`${Deno.cwd()}/database.json`);

const events: { [key in keyof EventHandlers]: any } = {
  ready,
  messageCreate,
  guildCreate,
  guildMemberAdd,
  guildMemberRemove,
  guildMemberUpdate
};

const eventHandlers: { [key in keyof EventHandlers]: any } = {};

for (const eventName in events) {
  eventHandlers[eventName as keyof EventHandlers] = ((...args: any[]) => {
    events[eventName as keyof EventHandlers](db, ...args);
  });
}

await createClient({
  "compress": true,
  "token": Deno.env.get("TOKEN") as string,
  "intents": [Intents.GUILDS, Intents.GUILD_MESSAGES, Intents.DIRECT_MESSAGES, Intents.GUILD_MEMBERS],
  "eventHandlers": eventHandlers
});