const { MessageEmbed } = require("discord.js");
const { getGuildById } = require("../utils/functions");
module.exports = {
  name: "messageUpdate",
  async execute(bot, oldMsg, newMsg) {
    if (!newMsg.guild) return;
    if (!newMsg.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const w = await oldMsg.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === bot.user.username);
    const guild = await getGuildById(newMsg.guild.id);
    const blacklistedWords = guild.blacklistedwords;

    // Couldn't find webhook/webhook doesn't exist
    if (!webhook) {
      return;
    }

    if (newMsg.author.id === bot.user.id) return;

    if (!oldMsg && !newMsg) {
      return;
    }

    if (blacklistedWords !== null && blacklistedWords[0]) {
      blacklistedWords.forEach((word) => {
        if (newMsg.content.toLowerCase().includes(word.toLowerCase())) {
          newMsg.delete();
          return newMsg
            .reply(
              "You used a bad word the admin has set, therefore your message was deleted!"
            )
            .then((msg) => {
              setTimeout(() => {
                msg.delete();
              }, 5000);
            });
        }
      });
    }

    const embed = new MessageEmbed()
      .setTitle(`Message updated in **${newMsg.channel.name}**`)
      .setDescription(`Message send by **${newMsg.author.tag}** was edited`)
      .addField("**Old Message**", `${oldMsg}`)
      .addField("**New Message**", `${newMsg}`)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed);
  },
};
