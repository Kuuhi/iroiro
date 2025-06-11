// commands/reboot.js

module.exports = {
  data: {
    name: 'reboot',
    description: '(管理者)process.exit()を呼び出す',
  },

  adminIds: ["777466773955936266"],

  async execute(client, message, args) {
    if (!this.adminIds.includes(message.author.id)) return
    await message.react("✅")
    const exitCode = Number(args[0]) || 0;
    process.exit(exitCode);
  },
};
