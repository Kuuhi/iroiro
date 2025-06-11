const { Client, GatewayIntentBits, Partials, Collection, ChannelType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
  ],
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ],
});

client.once('ready', () => {
  console.log('起動完了');
});

require('dotenv').config()

const math = require("mathjs");

const fs = require('node:fs');

const path = require('node:path');

client.login(process.env.BOT_TOKEN);

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}


function mathEvaluate(expression) {
  if (!expression) return
  try {
    const formattedExpression = expression
      .replace(/\*\*/g, "^")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
    return math.evaluate(formattedExpression);
  } catch (error) {
    return null
  }
}

const prefix = "e+"

client.on('messageCreate', async message => {
  //command 
  if (!message.author.bot && message.content.startsWith(prefix)) {

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

     if (!command) {
        command = client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    }

    if (!command) {
        return message.reply({ content: "コマンドが見つかりませんでした", allowedMentions: { parent: [] } });
    }


    try {
      await command.execute(client, message, args);
    } catch (error) {
      console.error(error);
      if (message.member.id === "777466773955936266") {
        const embed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setDescription(error)
          .setTimestamp()
        return message.reply({ content: "えらった！", embeds: [embed], allowedMentions: { parent: [] } });
      }
      message.reply({ content: "えらった！", allowedMentions: { parent: [] } });
    }
  }

  if (message.content.startsWith("?") && message.content !== "?") { // mathjs
    try {

      const expression = message.content.substring(1).trim();
      const result = mathEvaluate(expression)

      message.reply({ content: String(result), allowedMentions: { parse: [] } });
    } catch (error) {
      console.error(error)
      message.reply({ content: "無効な数式です\n-# " + error, allowedMentions: { parse: [] } });
    }
  }
  if (message.member?.roles?.cache.has('898931354769707078')) { // Mute
    message.delete()
  }
}) 