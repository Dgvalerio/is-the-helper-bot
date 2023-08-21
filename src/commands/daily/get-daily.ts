import { formatISO } from 'date-fns';
import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';

import { daily } from '../../firebase/daily';
import { formatDate } from '../../utils/date';
import { Command } from '../index';

const data = new SlashCommandBuilder()
  .setName('get-daily')
  .setDescription('Informa todas as descrições da daily de hoje');

const thumbnail =
  'https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-w6bg-lgZYydLGlwMCd6WJivJxKq4Pfzv3FSJ3wNe3iZODLZuq67nhBKoNueUQtj1hWMIwOBYGa6zIPEtWlhLjCkmkwKw=w1278-h615';

const execute = async (interaction: CommandInteraction): Promise<void> => {
  const response = await daily.readOne(formatISO(new Date()).split('T')[0]);

  if (!response) return;

  const exampleEmbed = new EmbedBuilder()
    .setColor('#0e2443')
    .setTitle(`Daily de ${formatDate(response.date)}`)
    .setDescription(`Projeto “International School”`)
    .setThumbnail(thumbnail)
    .addFields(
      ...(response.annotations && response.annotations.length > 0
        ? response.annotations.map((day) => ({
            name: `${day.user.nick}:`,
            value: day.notes.map((note) => `> ${note}`).join('\n'),
          }))
        : [{ name: 'Não há conteúdo!', value: '\u200B' }])
    )
    .setTimestamp()
    .setFooter({
      text: `Solicitado por ${interaction.user.displayName}`,
      iconURL: interaction.user.displayAvatarURL(),
    });

  await interaction.reply({ embeds: [exampleEmbed] });
};

export const getDaily: Command = { data, execute };
