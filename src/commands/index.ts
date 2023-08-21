import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { addDaily } from './add-daily';
import { getDaily } from './get-daily';

export interface Command {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute(interaction: CommandInteraction): Promise<void>;
}

export const commands: Command[] = [getDaily, addDaily];
