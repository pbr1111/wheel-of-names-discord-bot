import { Client } from 'discord.js';
import { processCommand } from './bot/commands';

const client = new Client();

client.on('ready', () => {
  console.log('Connected as ' + client.user?.tag);
});

client.on('message', (receivedMessage) => {
  if (receivedMessage.author === client.user) {
    return;
  }

  if (receivedMessage.content?.[0] === '!') {
    processCommand(receivedMessage);
  }
});

client.login(process.env.TOKEN);
