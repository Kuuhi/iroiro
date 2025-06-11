module.exports = {
  data: {
    name: 'lock',
    description: '(管理者)チャンネルをロックします',
  },

  async execute(client, message) {

    if (message.member.roles.cache.has("1062875133703888896")) {
      return await message.reply({
        content: "あなたの権限が不足しています",
        allowedMentions: { parse: [] }
      })
    }
    if (message.channel.isThread()) {
      await message.channel.setLocked(true);
      await message.react("✅")
      await message.channel.send({
        content: "このスレッドはロックされました。\nロックを解除したい場合は`unlock`コマンドを使用"
      })
    }
  },
};