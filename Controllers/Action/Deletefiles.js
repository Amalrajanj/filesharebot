import { db } from "../../Database/Actions/Queries.js";
import { StatelessQuestion } from "@grammyjs/stateless-question";
import { Adminkeyboard } from "../Buttons/InlineKeyboard.js";

export const removeonefileQuestion = new StatelessQuestion(
  "removeonefile",
  async (ctx) => {
    await db.checkUser(ctx.from.id).then((res) => {
      if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
        db.removeFile(ctx.message.text).then((stats) => {
          if (stats.deletedCount > 0) {
            ctx.reply(`✔ <b>Success</b>`, {
              parse_mode: "HTML",
              reply_markup: Adminkeyboard,
            });
          } else {
            ctx.reply(
              `❗ <i>Something went wrong make sure the entered shortid is correct</i>`,
              {
                parse_mode: "HTML",
                reply_markup: Adminkeyboard,
              }
            );
          }
        });
      } else {
        ctx.reply("☢ Authorization failed");
      }
    });
  }
);

//
//
//

export const removebatchfileQuestion = new StatelessQuestion(
  "removebatchfile",
  async (ctx) => {
    await db.checkUser(ctx.from.id).then((res) => {
      if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
        db.removeUserFile(parseInt(ctx.message.text)).then((stats) => {
          if (stats.deletedCount > 0) {
            ctx.reply(
              `✔ <b>Success</b> - <i>removed ${stats.deletedCount} files</i>`,
              {
                parse_mode: "HTML",
                reply_markup: Adminkeyboard,
              }
            );
          } else {
            ctx.reply(
              `❗ <i>Something went wrong make sure the entered user id is correct</i>`,
              {
                parse_mode: "HTML",
                reply_markup: Adminkeyboard,
              }
            );
          }
        });
      } else {
        ctx.reply("☢ Authorization failed");
      }
    });
  }
);

export const managefilesCallback = async (ctx) => {
  await db.checkUser(ctx.from.id).then((res) => {
    if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
      if (ctx.match == "REMOVEONE_FILE") {
        return removeonefileQuestion.replyWithHTML(
          ctx,
          `🆔 <i>Enter short Id of file to be removed</i>`
        );
      } else if (ctx.match == "REMOVEBATCH_FILE") {
        return removebatchfileQuestion.replyWithHTML(
          ctx,
          `🆔 <i>Enter user id to remove all files send by a user</i>`
        );
      }
    } else {
      ctx.reply("☢ Authorization failed");
    }
  });
};

export const deleteallcallback = (ctx) => {
  db.checkUser(ctx.from.id).then((res) => {
    if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
      db.deleteCollection().then((stats) => {
        if (stats.deletedCount > 0) {
          ctx.reply(
            `✔ <b>Success</b> <i>removed ${stats.deletedCount} files</i>`,
            {
              parse_mode: "HTML",
            }
          );
        } else {
          ctx.reply(`❗ <i>Something went wrong try again later</i>`, {
            parse_mode: "HTML",
          });
        }
      });
    }
  });
};
