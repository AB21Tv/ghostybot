const { MessageEmbed } = require("discord.js");
const { getGuildById, getUserById } = require("../../utils/functions");

module.exports = {
  name: "profile",
  description: "See the full profile of a user",
  category: "economy",
  cooldown: 2,
  async execute(bot, message) {
    const member = message.mentions.users.first() || message.author;
    const userId = member.id;
    const guildId = message.guild.id;
    const { user } = await getUserById(userId, guildId);
    const guild = await getGuildById(guildId);

    const { money, bank, inventory } = user;

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s profile`)
      // .addField("**XP**", xp, true)
      // .addField("**Level**", level, true)
      .addField("**Money**", money, true)
      .addField("**Bank**", bank, true)
      .addField("**Inventory Items**", inventory.length, true)
      .setDescription(
        `Use \`${guild.prefix}inventory <user>\` to view their inventory items.`
      )
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
