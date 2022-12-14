import { db } from "../../Database/Actions/Queries.js";
import { InlineKeyboard } from "grammy";

//
//
//
//
export const manageadmins = async (ctx) => {
  if (ctx.from.id == process.env.ADMIN_ID) {
    await db.getAdmins().then((res) => {
      const inlineKeyboard = new InlineKeyboard()
        .text("๐ Add Admin", "ADD_ADMIN")
        .text("๐ Remove Admin", "REMOVE_ADMIN");
      if (res?.length < 1) {
        ctx.reply(
          `๐ Admin list\n\n<i>No admins found .Newly added admins can \n1. Manage broadcasts\n2.Manage files\n3.Manage users\n\n</i>`,
          {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard,
          }
        );
      } else {
        let admins = res.map((item, index) => {
          return `๐ค : <code>${item.first_name}</code>\n๐ : <code>${
            item.id
          }</code>\n ${item.username ? `๐ท : @${item.username}` : ""}\n\n`;
        });
        ctx.reply(admins.join(""), {
          parse_mode: "HTML",
          reply_markup: inlineKeyboard,
        });
      }
    });
  } else {
    ctx.reply("โข Authorization failed");
  }
};

//
//
//
//

export const botstatus = async (ctx) => {
  ctx.deleteMessage();
  await db.checkUser(ctx.from.id).then(async (res) => {
    if (res?.admin || ctx.from.id == process.env.ADMIN_ID) {
      let files = await db.getAllFiles();
      let users = await db.getAllUser();

      ctx.reply(
        `๐<b>Bot statitics</b>\n\n๐งพ<i>Total users</i>: ${
          users.length ?? ""
        }\n๐ <i>Total files</i>: ${files.length ?? ""}`,
        { parse_mode: "HTML" }
      );
    } else {
      ctx.reply("โข Authorization failed");
    }
  });
};

//
//
//
//

export const deletefiles = async (ctx) => {
  ctx.deleteMessage();
  await db.checkUser(ctx.from.id).then(async (res) => {
    if (res?.admin || ctx.from.id == process.env.ADMIN_ID) {
      const inlineKeyboard = new InlineKeyboard()
        .text("โ Remove One", "REMOVEONE_FILE")
        .text("โ Remove Batch", "REMOVEBATCH_FILE");

      db.getAllFiles().then((files) => {
        ctx.reply(
          `๐ <i>Total files</i>: ${
            files.length ?? ""
          }\n\n<i>You can remove files one by one using file ID or delete a batch of files send by a particular user</i>`,
          {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard,
          }
        );
      });
    } else {
      ctx.reply("โข Authorization failed");
    }
  });
};

//
//
//

export const deleteall = (ctx) => {
  ctx.deleteMessage();
  db.checkUser(ctx.from.id).then((res) => {
    if (res.admin || ctx.from.id == process.env.ADMIN_ID) {
      const inlineKeyboard = new InlineKeyboard().text(
        "โ Confirm",
        "CONFIRMREMOVEALLFILES"
      );
      ctx.reply(
        `โ You are about to remove all files stored in database.Click confirm to continue`,
        {
          parse_mode: "HTML",
          reply_markup: inlineKeyboard,
        }
      );
    }
  });
};
