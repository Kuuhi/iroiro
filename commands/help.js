module.exports = {
  data: {
    name: 'help',
    description: '利用可能なコマンドを表示します',
  },

  async execute(message, args) {
    const { commands } = message.client;

    const commandList = commands.map(command => {
      return `\`${command.data.name}\`: ${command.data.description || '-'}`;
    }).join('\n');

    const embed = {
      color: 0x0099ff,
      title: '利用可能なコマンド',
      description: commandList
    };

    await message.reply({
      embeds: [embed],
      allowedMentions: { parent: [] }
    });
  },
};