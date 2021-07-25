import { Message, MessageAttachment, MessageEmbed } from 'discord.js';
import { parseArgsAsCsv } from '../../utils/commands';
import { generateSpinWheel } from './pick/spin-wheel';

const FRAME_DELAY_MS = 50;
const MAX_DURATION_MS = 5000;
const LAST_FRAME_DURATION_MS = 1000 / FRAME_DELAY_MS;
const MIN_ANGLE = 360;
const MAX_ANGLE = 360 * 8;
const DURATION = MAX_DURATION_MS / FRAME_DELAY_MS;

const styles = {
  canvas: {
    width: 250,
    height: 250
  }
} as const;

const pickCommand = async (args: string[], receivedMessage: Message) => {
  const options = parseArgsAsCsv(args);

  if (!options || options.length < 2) {
    await receivedMessage.channel.send('ℹ Usage: _!pick name1,name2,name3_');
    return;
  }

  const loadingMessageEmbed = new MessageEmbed()
    .setTitle('Wheel of names')
    .setDescription('Creating the wheel, wait a moment...');

  const loadingMessage = await receivedMessage.channel.send(
    loadingMessageEmbed
  );

  const randomEndAngle = Math.random() * (MAX_ANGLE - MIN_ANGLE) + MIN_ANGLE;

  const wheel = generateSpinWheel(
    options,
    randomEndAngle,
    DURATION,
    FRAME_DELAY_MS,
    styles.canvas.width,
    styles.canvas.height,
    LAST_FRAME_DURATION_MS
  );

  loadingMessage.delete();

  const spinWheelAttachment = new MessageAttachment(
    wheel.getGif(),
    'spin-wheel.gif'
  );

  const message = await receivedMessage.channel.send(
    new MessageEmbed()
      .setTitle('Wheel of names')
      .setImage('attachment://spin-wheel.gif')
      .attachFiles([spinWheelAttachment])
  );

  setTimeout(async () => {
    await message.delete();

    const selectedOptionAttachmment = new MessageAttachment(
      wheel.getLastFrame(),
      'last-option.png'
    );

    await receivedMessage.channel.send(
      new MessageEmbed()
        .setColor(wheel.selectedOptionColor)
        .setTitle('Wheel of names')
        .setDescription(`🏆 Winner: **${wheel.selectedOption}**`)
        .setImage('attachment://last-option.png')
        .attachFiles([selectedOptionAttachmment])
    );
  }, MAX_DURATION_MS);
};

export { pickCommand };
