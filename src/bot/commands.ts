import { Message } from 'discord.js';
import { pickCommand } from './commands/pick';

type Commands = {
  [key: string]: (args: string[], receivedMessage: Message) => void;
};

const commands: Commands = {
  pick: pickCommand
};

const processCommand = (receivedMessage: Message) => {
  const fullCommand = receivedMessage.content.substr(1);
  const splitCommand = fullCommand.split(' ');
  const primaryCommand = splitCommand[0];
  const args = splitCommand.slice(1);

  console.log('Command received: ', primaryCommand, 'Arguments: ', args);

  const command = commands[primaryCommand];
  command?.(args, receivedMessage);
};

export { processCommand };
