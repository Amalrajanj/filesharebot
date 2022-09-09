import { db } from "../../Database/Actions/Queries.js";
import { InlineKeyboard } from "grammy";

export const CheckChannel = async (ctx) => {
  ctx.deleteMessage();
  let custom = db.getcustom();
  await ctx.api
    .getChatMember(custom?.channelID || process.env.MAIN_CHANNEL, ctx.from.id)
    .then(async (stats) => {
      if (stats?.status != "left") {
        ctx.reply(
          `<b>I will store files for you and generate sharable links</b>`,
          {
            parse_mode: "HTML",
          }
        );
      } else {
        try {
          const inlineKeyboard = new InlineKeyboard()
            .url(
              "✔ JOIN CHANNEL",
              custom?.channelLink ?? process.env.INVITE_LINK
            )
            .row()
            .text("♻️ Try again", "CHECK_CHANNEL");
          ctx.reply(`🔖 <i>You must join our channel to use this bot</i>`, {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard,
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
};
