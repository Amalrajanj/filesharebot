import { StatelessQuestion } from "@grammyjs/stateless-question";
import { db } from "../../Database/Actions/Queries.js";
import { Adminkeyboard } from "../Buttons/InlineKeyboard.js";

export const addnewAdminQuestion = new StatelessQuestion(
  "addnewadmin",
  (ctx) => {
    if (ctx?.message?.text) {
      db.addnewAdmin(parseInt(ctx.message.text)).then((res) => {
        console.log(res);
        if (res?.modifiedCount > 0) {
          try {
            ctx.api.sendMessage(
              parseInt(ctx.message.text),
              `🔑 You are hired as admin`
            );
            ctx.reply(
              `✔ <b>Success - </b><i>Please check manage admin sections and verify</i>`,
              {
                parse_mode: "HTML",
                reply_markup: Adminkeyboard,
              }
            );
          } catch (e) {
            console.log(e);
          }
        } else {
          ctx.reply(
            "<i>❗ Make sure user id is correct or already an admin</i>",
            {
              parse_mode: "HTML",
              reply_markup: Adminkeyboard,
            }
          );
        }
      });
    }
  }
);

export const removeAdminQuestion = new StatelessQuestion(
  "removeadmin",
  (ctx) => {
    console.log("s");
    if (ctx?.message?.text) {
      db.removeAdmin(parseInt(ctx.message.text)).then((res) => {
        console.log(res);
        if (res?.modifiedCount > 0) {
          try {
            ctx.reply(
              `✔ <b>Success - </b><i>Please check manage admin sections and verify</i>`,
              {
                parse_mode: "HTML",
                reply_markup: Adminkeyboard,
              }
            );
          } catch (e) {
            console.log(e);
          }
        } else {
          ctx.reply("<i>❗ Make sure user id is correct</i>", {
            parse_mode: "HTML",
            reply_markup: Adminkeyboard,
          });
        }
      });
    }
  }
);

export const manageadminCallback = (ctx) => {
  if (ctx.from.id == process.env.ADMIN_ID) {
    console.log(ctx.match);
    if (ctx.match == "ADD_ADMIN") {
      return addnewAdminQuestion.replyWithHTML(
        ctx,
        `<i>Enter id of user to be promoted-(make sure the user has already started the bot)</i>`
      );
    } else if (ctx.match == "REMOVE_ADMIN") {
      return removeAdminQuestion.replyWithHTML(
        ctx,
        `🆔 <i>Enter Id of the admin to be removed</i>`
      );
    }
  }
};
