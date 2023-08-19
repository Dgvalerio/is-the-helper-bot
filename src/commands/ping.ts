import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { Command } from './index';

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com "Pong"!'),

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply('Pong!');
  },
};
