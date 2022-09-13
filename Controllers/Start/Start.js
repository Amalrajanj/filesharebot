import { InlineKeyboard } from "grammy";
import { db } from "../../Database/Actions/Queries.js";
import { SubAdminkeyboard } from "../Buttons/InlineKeyboard.js";
import { AdminStart } from "./Admin.js";
import { customProps } from "./Custom.js";
import { handlequery } from "./Handlequery.js";
import { SubadminStart } from "./Subadmin.js";

export const start = async (ctx) => {
  let query = ctx?.message?.text?.split(" ")[1];

  let user = {
    ...ctx.from,
    admin: false,
    banStatus: false,
  };

  await db
    .saveUser(user)
    .then((res) => {
      !res ? console.log("saveUser failed") : "";
    })
    .catch((e) => {
      console.log("err");
    });

  await db.checkUser(ctx.from.id).then(async (res) => {
    if (!res?.banStatus) {
      let custom = await db.getcustom();

      await ctx.api
        .getChatMember(
          custom?.channelID || process.env.MAIN_CHANNEL,
          ctx.from.id
        )
        .then(async (status) => {
          if (status.status != "left") {
            if (query) {
              handlequery(ctx);
            } else if (res) {
              if (ctx.from.id == process.env.ADMIN_ID) {
                AdminStart(ctx);
              } else if (res?.admin == true) {
                SubadminStart(ctx);
              } else {
                let custom = await db.getcustom();
                ctx.reply(
                  `<b>${
                    custom?.welcome ? custom.welcome : customProps.welcome
                  }</b>`,
                  {
                    parse_mode: "HTML",
                  }
                );
              }
            } else {
              console.log("check user failed");
            }
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
    } else {
      ctx.reply(`You can no longer use this bot as you are banned`);
    }
  });
};
