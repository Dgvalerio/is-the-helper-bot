import {
  Collection,
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

import { ping } from './ping';
import { server } from './server';
import { user } from './user';

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}

const _commands: Collection<string, Command> = new Collection();

_commands.set(ping.data.name, ping);
_commands.set(server.data.name, server);
_commands.set(user.data.name, user);

export { _commands };

export const commands: Command[] = [ping, server, user];
