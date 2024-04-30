import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { pullRequest } from '../../firebase/pull-request';
import { Command } from '../index';

const data = new SlashCommandBuilder()
  .setName('add-pr')
  .setDescription('Adicione um Pull Request para ser revisado')
  .addStringOption((option) =>
    option
      .setName('project')
      .setDescription('O projeto qual a daily se refere')
      .setRequired(true)
      .addChoices({
        name: 'International School',
        value: 'international_school',
      })
  )
  .addStringOption((option) =>
    option
      .setName('link')
      .setDescription('O link do seu Pull Request')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('title')
      .setDescription('Do que se trata o seu Pull Request')
      .setRequired(true)
  );

const execute = async (interaction: CommandInteraction): Promise<void> => {
  const [project, link, title] = interaction.options.data;

  await pullRequest.create({
    project: String(project.value),
    link: String(link.value),
    title: String(title.value),
  });

  await interaction.reply('rest');
};

export const addPullRequest: Command = { data, execute };
