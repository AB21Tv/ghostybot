import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class ResumeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "resume",
      description: "Resume a song that was playing",
      aliases: ["r"],
      category: "music",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!message.member?.voice.channel) {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }

      const queue = this.bot.player.getQueue(message);
      if (!this.bot.player.isPlaying(message)) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      if (!queue) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      this.bot.player.resume(message);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
