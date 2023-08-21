import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';

import { daily } from '../firebase/daily';
import { formatDate } from '../utils/date';
import { Command } from './index';

const data = new SlashCommandBuilder()
  .setName('add-daily')
  .setDescription('Adicione seus feitos a daily de hoje')
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
      .setName('description')
      .setDescription('Escreve aqui o que você fez hoje')
      .setRequired(true)
  );

const execute = async (interaction: CommandInteraction): Promise<void> => {
  const [selectedProject, description] = interaction.options.data;

  const created = await daily.create({
    projectKey: String(selectedProject.value),
    description: String(description.value),
    user: {
      id: String(interaction.user.id),
      nick: (interaction.member as { nickname: string }).nickname,
    },
  });

  if (!created) return;

  const thumbnail =
    'https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-wvU39mqgBrtNICSRbs-vgiyeUcp9Zcrh8BNn4x76GYmWwk4PLeBGsu1wZ5z0boaPnYd7rs1z3fOOt4hxi6F61BrTQcwA=w1278-h615';

  const exampleEmbed = new EmbedBuilder()
    .setColor('#0e2443')
    .setTitle(`Daily de ${formatDate(created.date)}`)
    .setDescription('Projeto “International School”')
    .setThumbnail(thumbnail)
    .addFields(
      {
        name: 'Descrição',
        value: `> ${created.annotations
          .find((c) => c.user.id === String(interaction.user.id))
          ?.notes.join('\n > ')}`,
      },
      { name: '\u200B', value: '\u200B' }
    )
    .setTimestamp()
    .setFooter({
      text: interaction.user.displayName,
      iconURL: interaction.user.displayAvatarURL(),
    });

  await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
};

export const addDaily: Command = { data, execute };
