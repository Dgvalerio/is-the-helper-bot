import { Client, Events, GatewayIntentBits } from 'discord.js';

import 'dotenv/config';
import { commands } from './commands';

const { CLIENT_TOKEN } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) =>
  console.log(`Ready! Logged in as ${c.user.tag}`)
);

client.login(CLIENT_TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.find(
    ({ data }) => data.name === interaction.commandName
  );

  if (!command) {
    console.error(`O comando "${interaction.commandName}" não foi encontrado!`);

    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    const res = {
      content: 'Ocorreu um erro ao executar esse comando!',
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(res);
    } else {
      await interaction.reply(res);
    }
  }
});
