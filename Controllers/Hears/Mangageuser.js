import { db } from "../../Database/Actions/Queries.js";
import { StatelessQuestion } from "@grammyjs/stateless-question";
import { Adminkeyboard, SubAdminkeyboard } from "../Buttons/InlineKeyboard.js";

export const banuserQuestion = new StatelessQuestion("banuser", (ctx) => {
  db.checkUser(ctx.from.id).then((res) => {
    if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
      if (ctx?.message?.text) {
        db.banUser(parseInt(ctx.message.text)).then((stats) => {
          console.log(stats);
          if (stats.modifiedCount > 0) {
            ctx.reply(`Banned`, {
              parse_mode: "HTML",
              reply_markup:
                ctx.from.id == process.env.ADMIN_ID
                  ? Adminkeyboard
                  : res.admin
                  ? SubAdminkeyboard
                  : null,
            });
          }
        });
      } else {
        ctx.reply(`✔ <b>Something went wrong</b>`, {
          parse_mode: "HTML",
          reply_markup:
            ctx.from.id == process.env.ADMIN_ID
              ? Adminkeyboard
              : res.admin
              ? SubAdminkeyboard
              : null,
        });
      }
    } else {
      ctx.reply("☢ Authorization failed");
    }
  });
});
export const unbanuserQuestion = new StatelessQuestion("unbanuser", (ctx) => {
  db.checkUser(ctx.from.id).then((res) => {
    if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
      if (ctx?.message?.text) {
        db.unBan(parseInt(ctx.message.text)).then((stats) => {
          if (stats.modifiedCount > 0) {
            ctx.reply(`✔ <b>Unbanned</b>`, {
              parse_mode: "HTML",
              reply_markup:
                ctx.from.id == process.env.ADMIN_ID
                  ? Adminkeyboard
                  : res.admin
                  ? SubAdminkeyboard
                  : null,
            });
          }
        });
      } else {
        ctx.reply(`✔ <b>Something went wrong</b>`, {
          parse_mode: "HTML",
          reply_markup:
            ctx.from.id == process.env.ADMIN_ID
              ? Adminkeyboard
              : res.admin
              ? SubAdminkeyboard
              : null,
        });
      }
    } else {
      ctx.reply("☢ Authorization failed");
    }
  });
});

export const banuser = (ctx) => {
  console.log(1);
  ctx.deleteMessage();
  db.checkUser(ctx.from.id).then((res) => {
    if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
      return banuserQuestion.replyWithHTML(
        ctx,
        `🆔<i> Enter user id of user to be banned</i>`
      );
    } else {
      ctx.reply("☢ Authorization failed");
    }
  });
};
export const unbanuser = (ctx) => {
  ctx.deleteMessage();
  db.checkUser(ctx.from.id).then((res) => {
    if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
      return unbanuserQuestion.replyWithHTML(
        ctx,
        `🆔<i> Enter user id of user to be un banned</i>`
      );
    } else {
      ctx.reply("☢ Authorization failed");
    }
  });
};
