import Collection from "../modules/Discordeno/utils/collection.ts";

import Command from "../interfaces/Command.ts";

const botCommands = new Collection<string, Command>();

for (const dirEntry of Deno.readDirSync(`${Deno.cwd()}/commands`)) {
  if (dirEntry.isFile && dirEntry.name.endsWith(".ts")) {
    const command: { default: Command } = await import(`../commands/${dirEntry.name}`);
    botCommands.set(command.default.name, command.default);
  }
}

export default botCommands;