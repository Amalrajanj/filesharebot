import { db } from "../../Database/Actions/Queries.js";
import { InlineKeyboard } from "grammy";
import { customProps } from "../Start/Custom.js";
import { Adminkeyboard, SubAdminkeyboard } from "../Buttons/InlineKeyboard.js";

export const configbot = (ctx) => {
  db.checkUser(ctx.from.id).then((res) => {
    const inlineKeyboard = new InlineKeyboard()
      .text("Welcome message", "SET_WELCOME")
      .text("Channel link", "SET_CHANNEL_LINK")
      .text("Channel ID", "SET_CHANNEL_ID");
    if (ctx.from.id == process.env.ADMIN_ID || res?.admin) {
      db.getcustom().then((custom) => {
        ctx.reply(
          `<i>You can customize bot choose the options below</i>\n\n<b>Welcome:</b><code> ${
            custom?.welcome ? custom.welcome : customProps.welcome
          }</code>\n<b>Channel Link:</b> <code> ${
            custom?.channelLink ? custom.channelLink : process.env.INVITE_LINK
          }</code>\n<b>Channel ID:</b> <code> ${
            custom?.channelID ? custom.channelID : process.env.MAIN_CHANNEL
          }</code>`,
          {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard,
          }
        );
      });
    } else {
      ctx.reply("☢ Authorization failed");
    }
  });
};
