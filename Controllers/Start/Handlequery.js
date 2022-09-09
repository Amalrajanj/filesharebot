import { db } from "../../Database/Actions/Queries.js";

export const handlequery = async (ctx) => {
  let query = ctx?.message?.text?.split(" ")[1];
  await db.getFile(query).then((res) => {
    try {
      if (res.type == "video") {
        ctx.replyWithVideo(res.file_id, {
          caption: res.caption,
          parse_mode: "HTML",
          reply_markup: res.reply_markup ?? null,
        });
      } else if (res.type == "photo") {
        ctx.replyWithPhoto(res.file_id, {
          caption: res.caption,
          parse_mode: "HTML",
          reply_markup: res.reply_markup ?? null,
        });
      } else {
        ctx.replyWithDocument(res.file_id, {
          caption: res.caption,
          parse_mode: "HTML",
          reply_markup: res.reply_markup ?? null,
        });
      }
    } catch (error) {
      ctx.reply(
        `<i>The content you are looking for is not currently available</i>`,
        {
          parse_mode: "HTML",
        }
      );
    }
  });
};
