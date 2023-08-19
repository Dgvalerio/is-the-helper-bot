import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';

import { Command } from './index';

const date = new Date().toLocaleDateString('pt-BR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const dailys: { user: string; notes: string[] }[] = [
  {
    user: '@Davi',
    notes: [
      'Revisou PRs',
      'Revisou PR do Lucas do Cypress',
      'Revisou PR do Gustavo',
      'Refiz a palheta de Cores',
      'Terminei o componente de Text',
      'Montando a página de sign-in',
    ],
  },
  {
    user: '@Debora de Almeida',
    notes: [
      'Reunião de Alinhamento de Design',
      'Adicionando informações aos cards do JIRA',
    ],
  },
  {
    user: '@Gabriel Marques Frahm',
    notes: [
      'Revisou PRs',
      'Terminou Fluxo da Permissão',
      'Refatoraçào nos filtros',
    ],
  },
  {
    user: '@gustavo "poggers" alves',
    notes: ['Fez alterações no componente de InfoCard'],
  },
  {
    user: '@Lucas Lombardi',
    notes: [
      'Tentando fazer o Cypress rodar no docker',
      'Conseguiu o headless',
      'Está testando com a aplicação',
    ],
  },
  {
    user: '@Renan Vicente 🇧🇷',
    notes: [
      'Revisou PRs',
      'Revisou PR do Cypress',
      'Revisou PR do Gustavo',
      'Tá analisando e compreendendo o Back-end',
      'E segue corrigindo PR do Gabriel',
    ],
  },
  {
    user: '@Thomaz',
    notes: [
      'Revisando o PR do Alan de autenticação',
      'Configurando ferramente de testes e2e no backend',
      'Revisou PRs no Backend',
      'Trabalhando na integraçào no middlaware de permissões',
    ],
  },
  {
    user: '@Álan Bruno Rios Miguel',
    notes: [
      'Trabalhou no componente de Checkbox',
      'Esta trabalhando no componente de botão',
    ],
  },
  {
    user: '@Luiz Paulo',
    notes: [
      'Finalizou a implementação dos protocolos do REDIS e os testes',
      'Vendo permissões dos volumes no docker',
    ],
  },
];

const data = new SlashCommandBuilder()
  .setName('get-daily')
  .setDescription('Informa todas as descrições da daily de hoje');

const thumbnail =
  'https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-w6bg-lgZYydLGlwMCd6WJivJxKq4Pfzv3FSJ3wNe3iZODLZuq67nhBKoNueUQtj1hWMIwOBYGa6zIPEtWlhLjCkmkwKw=w1278-h615';

const execute = async (interaction: CommandInteraction): Promise<void> => {
  const exampleEmbed = new EmbedBuilder()
    .setColor('#0e2443')
    .setTitle(`Daily de ${date}`)
    .setDescription('Projeto “International School”')
    .setThumbnail(thumbnail)
    .addFields(
      ...dailys.map((day) => ({
        name: `${day.user}: `,
        value: day.notes.map((note) => `> ${note}`).join('\n'),
      }))
    )
    .setTimestamp()
    .setFooter({
      text: `Solicitado por ${interaction.user}`,
      iconURL: interaction.user.displayAvatarURL(),
    });

  await interaction.reply({ embeds: [exampleEmbed] });
};

export const getDaily: Command = { data, execute };
