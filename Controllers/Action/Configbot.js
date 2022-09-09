import { StatelessQuestion } from "@grammyjs/stateless-question";
import { db } from "../../Database/Actions/Queries.js";
import { Adminkeyboard, SubAdminkeyboard } from "../Buttons/InlineKeyboard.js";

export const setWelcomeQuestion = new StatelessQuestion("setWelcome", (ctx) => {
  db.checkUser(ctx.from.id).then((res) => {
    if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
      if (ctx?.message?.text) {
        db.getcustom().then((custom) => {
          if (custom) {
            custom.welcome = ctx.message.text;
            console.log(custom);
          } else {
            custom = {
              welcome: ctx.message.text,
              channelID: null,
              channelLink: null,
              ADMIN: parseInt(process.env.ADMIN_ID),
            };
          }
          db.setCustom(custom).then((stats) => {
            if (stats) {
              ctx.reply(`✔ <b>Updated</b>`, {
                parse_mode: "HTML",
                reply_markup:
                  ctx.from.id == process.env.ADMIN_ID
                    ? Adminkeyboard
                    : res.admin
                    ? SubAdminkeyboard
                    : null,
              });
            } else {
              ctx.reply(
                `✔ <b>Something went wrong Check if its updated or not</b>`,
                {
                  parse_mode: "HTML",
                  reply_markup:
                    ctx.from.id == process.env.ADMIN_ID
                      ? Adminkeyboard
                      : res.admin
                      ? SubAdminkeyboard
                      : null,
                }
              );
            }
          });
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

//
//
//
export const setChannelLinkQuestion = new StatelessQuestion(
  "setChannelLink",
  (ctx) => {
    db.checkUser(ctx.from.id).then((res) => {
      if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
        if (ctx?.message?.text) {
          db.getcustom().then((custom) => {
            if (custom) {
              custom.channelLink = ctx.message.text;
              console.log(custom);
            } else {
              custom = {
                welcome: null,
                channelID: null,
                channelLink: ctx.message.text,
                ADMIN: process.env.ADMIN_ID,
              };
            }
            db.setCustom(custom).then((stats) => {
              if (stats) {
                ctx.reply(`✔ <b>Updated</b>`, {
                  parse_mode: "HTML",
                  reply_markup:
                    ctx.from.id == process.env.ADMIN_ID
                      ? Adminkeyboard
                      : res.admin
                      ? SubAdminkeyboard
                      : null,
                });
              } else {
                ctx.reply(
                  `✔ <b>Something went wrong Check if its updated or not</b>`,
                  {
                    parse_mode: "HTML",
                    reply_markup:
                      ctx.from.id == process.env.ADMIN_ID
                        ? Adminkeyboard
                        : res.admin
                        ? SubAdminkeyboard
                        : null,
                  }
                );
              }
            });
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
  }
);

//
//
//
export const setChannelIDQuestion = new StatelessQuestion(
  "setChannelID",
  (ctx) => {
    db.checkUser(ctx.from.id).then((res) => {
      if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
        if (ctx?.message?.text) {
          db.getcustom().then((custom) => {
            if (custom) {
              custom.channelID = ctx.message.text;
              console.log(custom);
            } else {
              custom = {
                welcome: null,
                channelID: ctx.message.text,
                channelLink: null,
                ADMIN: process.env.ADMIN_ID,
              };
            }
            db.setCustom(custom).then((stats) => {
              if (stats) {
                ctx.reply(`✔ <b>Updated</b>`, {
                  parse_mode: "HTML",
                  reply_markup:
                    ctx.from.id == process.env.ADMIN_ID
                      ? Adminkeyboard
                      : res.admin
                      ? SubAdminkeyboard
                      : null,
                });
              } else {
                ctx.reply(
                  `✔ <b>Something went wrong Check if its updated or not</b>`,
                  {
                    parse_mode: "HTML",
                    reply_markup:
                      ctx.from.id == process.env.ADMIN_ID
                        ? Adminkeyboard
                        : res.admin
                        ? SubAdminkeyboard
                        : null,
                  }
                );
              }
            });
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
  }
);

//
//
//
export const handleConfigCallback = (ctx) => {
  if (ctx.from.id == process.env.ADMIN_ID || res?.admin) {
    if (ctx.match == "SET_WELCOME") {
      return setWelcomeQuestion.replyWithHTML(
        ctx,
        `✏️ Enter new welcome message`
      );
    } else if (ctx.match == "SET_CHANNEL_LINK") {
      return setChannelLinkQuestion.replyWithHTML(
        ctx,
        `✏️ Enter invite link of channel`
      );
    } else if (ctx.match == "SET_CHANNEL_ID") {
      return setChannelIDQuestion.replyWithHTML(
        ctx,
        `✏️ Enter Channel ID of your channel`
      );
    }
  } else {
    ctx.reply("☢ Authorization failed");
  }
};
