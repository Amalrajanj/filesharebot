import { db } from "../../Database/Actions/Queries.js";
import { SubAdminkeyboard } from "../Buttons/InlineKeyboard.js";

export const SubadminStart = async (ctx) => {
  await db.checkUser(ctx.from.id).then((res) => {
    console.log(2);
    if (res?.admin) {
      ctx.reply("Entering Admin mode!", {
        reply_markup: SubAdminkeyboard,
      });
    }
  });
};
