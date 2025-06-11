// commands/help.js

module.exports = {
  data: {
    name: 'help',
    description: '利用可能なコマンドを表示します',
  },
  aliases: ['help', '?'],
  
  async execute(client, message, args) {
    const { commands } = message.client;
    const uniqueCommands = new Collection();
    for (const [name, command] of commands) {
        if (command.data && command.data.name === name) {
            uniqueCommands.set(name, command);
        }
    }

    const commandList = uniqueCommands.map(command => {
      return `\`${command.data.name}\`: ${command.data.description || '説明がありません'}`;
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