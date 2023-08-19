import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { Command } from './index';

export const server: Command = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute(interaction: CommandInteraction): Promise<void> {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
    );
  },
};
