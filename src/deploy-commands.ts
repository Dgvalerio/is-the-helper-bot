import 'dotenv/config';
import { REST, Routes } from 'discord.js';

import { commands } from './commands';

const { CLIENT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST().setToken(`${CLIENT_TOKEN}`);

(async (): Promise<void> => {
  try {
    console.log(`Atualizando ${commands.length} comandos (/) na aplicação.`);

    const data = (await rest.put(
      Routes.applicationGuildCommands(`${CLIENT_ID}`, `${GUILD_ID}`),
      { body: commands.map((command) => command.data.toJSON()) }
    )) as string[];

    console.log(`Sucesso ao atualizar ${data.length} comandos.`);
  } catch (error) {
    console.error(error);
  }
})();
