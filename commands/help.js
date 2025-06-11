<<<<<<< HEAD
// commands/help
=======
// commands/help.js
>>>>>>> b0591734ff8459c1b638da0ff64f2d6478e8b11b

module.exports = {
  data: {
    name: 'help',
    description: '利用可能なコマンドを表示します',
  },
  aliases: ['help', '?'],
  
  async execute(client, message, args) {
    const { commands } = message.client;
<<<<<<< HEAD
    const commandList = commands.map(command => {
      return `\`${command.data.name}\`: ${command.data.description || '-'}`;
=======
    const uniqueCommands = new Collection();
    for (const [name, command] of commands) {
        if (command.data && command.data.name === name) {
            uniqueCommands.set(name, command);
        }
    }

    const commandList = uniqueCommands.map(command => {
      return `\`${command.data.name}\`: ${command.data.description || '説明がありません'}`;
>>>>>>> b0591734ff8459c1b638da0ff64f2d6478e8b11b
    }).join('\n');

    const embed = {
      color: 0x0099ff,
      title: '利用可能なコマンド',
      description: commandList || '利用可能なコマンドがありません。'
    };

    await message.reply({
      embeds: [embed],
      allowedMentions: { parent: [] }
    });
  },
};