import { Client, Events, GatewayIntentBits } from 'discord.js';

import 'dotenv/config';

const { CLIENT_TOKEN } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) =>
  console.log(`Ready! Logged in as ${c.user.tag}`)
);

client.login(CLIENT_TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
});
