import { db } from "../../Database/Actions/Queries.js";
import { Keyboard } from "grammy";
import { Adminkeyboard, SubAdminkeyboard } from "../Buttons/InlineKeyboard.js";

export const AdminStart = (ctx) => {
  if (ctx.from.id == process.env.ADMIN_ID) {
    ctx.reply("Entering Admin mode!", {
      reply_markup: Adminkeyboard,
    });
  }
};
