import { db } from "../../Database/Actions/Queries.js";
import { InlineKeyboard } from "grammy";
import { customProps } from "../Start/Custom.js";

export const CheckChannel = async (ctx) => {
  ctx.deleteMessage();
  let custom = db.getcustom();
  await ctx.api
    .getChatMember(custom?.channelID || process.env.MAIN_CHANNEL, ctx.from.id)
    .then(async (stats) => {
      if (stats?.status != "left") {
        ctx.reply(
          `<b>${custom?.welcome ? custom.welcome : customProps.welcome}</b>`,
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
