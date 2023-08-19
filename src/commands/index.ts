import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { getDaily } from './get-daily';

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}

export const commands: Command[] = [getDaily];
