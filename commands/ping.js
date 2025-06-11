module.exports = {
  data: {
    name: 'ping',
    description: 'Pongを返します。',
  },

  async execute(message) {
    await message.reply({
      content: `Websocket: ${client.ws.ping}\nAPI Endpoint ${Date.now() - message.createdTimestamp}`,
      allowedMentions: { parse: [] }
    })
  },

};