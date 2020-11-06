const wiki = require("wikijs").default();
const BaseEmbed = require("../../modules/BaseEmbed");
module.exports = {
  name: "wiki",
  aliases: ["wikipediasearch", "wikipedia"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    if (!args[0]) {
      return message.channel.send("You must enter something to search!");
    }

    const search = await wiki.search(args.join(" "));

    if (!search.results[0]) {
      return message.channel.send("No results found");
    }

    const result = await wiki.page(search.results[0]);
    const description = await result.summary();
    const title = result.raw.title;
    const url = result.raw.fullurl;

    const embed = BaseEmbed(message)
      .setTitle(`${title} (read more)`)
      .setURL(url)
      .setDescription(
        `${description.slice(0, 2045)}${description.length > 2048 ? "..." : ""}`
      );
      
    message.channel.send("", embed);
  },
};
