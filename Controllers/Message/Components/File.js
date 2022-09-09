import { v4 as uuidv4 } from "uuid";
import { db } from "../../../Database/Actions/Queries.js";

export const filehandler = (ctx) => {
  {
    //handling files
    let fileDetails = {
      file_name: "",
      userId: ctx.from.id,
      file_id: "",
      uniqueId: "",
      caption: ctx.message.caption ?? "",
      reply_markup: ctx.message.reply_markup ?? "",
      shortid: uuidv4(),
      file_size: "",
      type: "",
    };
    if (ctx.message.photo) {
      fileDetails.file_id = ctx.message.photo[0].file_id;
      fileDetails.uniqueId = ctx.message.photo[0].file_unique_id;
      fileDetails.file_size = ctx.message.photo[0].file_size;
      fileDetails.type = "photo";

      //Forwarding files to log channel for bot admin inspection
      ctx.replyWithPhoto(fileDetails.file_id, {
        chat_id: process.env.LOG_CHANNEL,
        caption: `${fileDetails.caption}\n\n\n🆔: <code>${ctx.from.id}</code> \n👤: <code>${ctx.from.first_name}</code> \n🆔: <code>${fileDetails.shortid} </code>\n`,
        parse_mode: "HTML",
        reply_markup: fileDetails.reply_markup ?? null,
      });
    } else if (ctx.message.animation) {
      fileDetails.file_name = ctx.message.animation.file_name;
      fileDetails.file_id = ctx.message.animation.file_id;
      fileDetails.uniqueId = ctx.message.animation.file_unique_id;
      fileDetails.file_size = ctx.message.animation.file_size;
      fileDetails.type = "animation";

      //Forwarding files to log channel for bot admin inspection
      ctx.replyWithAnimation(fileDetails.file_id, {
        chat_id: process.env.LOG_CHANNEL,
        caption: `${fileDetails.caption}\n\n\n🆔: <code>${ctx.from.id}</code> \n👤: <code>${ctx.from.first_name}</code> \n🆔: <code>${fileDetails.shortid} </code>\n`,
        parse_mode: "HTML",
        reply_markup: fileDetails.reply_markup ?? null,
      });
    } else if (ctx.message.document) {
      fileDetails.file_name = ctx.message.document.file_name;
      fileDetails.file_id = ctx.message.document.file_id;
      fileDetails.uniqueId = ctx.message.document.file_unique_id;
      fileDetails.file_size = ctx.message.document.file_size;
      fileDetails.type = "document";

      //Forwarding files to log channel for bot admin inspection
      ctx.replyWithDocument(fileDetails.file_id, {
        chat_id: process.env.LOG_CHANNEL,
        caption: `${fileDetails.caption}\n\n\n🆔: <code>${ctx.from.id}</code> \n👤: <code>${ctx.from.first_name}</code> \n🆔: <code>${fileDetails.shortid} </code>\n`,
        parse_mode: "HTML",
        reply_markup: fileDetails.reply_markup ?? null,
      });
    } else if (ctx.message.video) {
      fileDetails.file_name = ctx.message.video.file_name;
      fileDetails.file_id = ctx.message.video.file_id;
      fileDetails.uniqueId = ctx.message.video.file_unique_id;
      fileDetails.file_size = ctx.message.video.file_size;
      fileDetails.type = "video";

      //Forwarding files to log channel for bot admin inspection
      ctx.replyWithVideo(fileDetails.file_id, {
        chat_id: process.env.LOG_CHANNEL,
        caption: `${fileDetails.caption}\n\n\n🆔: <code>${ctx.from.id}</code> \n👤: <code>${ctx.from.first_name}</code> \n🆔: <code>${fileDetails.shortid} </code>\n`,
        parse_mode: "HTML",
        reply_markup: fileDetails.reply_markup ?? null,
      });
    } else if (ctx.message.audio) {
      fileDetails.file_name = ctx.message.audio.file_name;
      fileDetails.file_id = ctx.message.audio.file_id;
      fileDetails.uniqueId = ctx.message.audio.file_unique_id;
      fileDetails.file_size = ctx.message.audio.file_size;
      fileDetails.type = "audio";

      //Forwarding files to log channel for bot admin inspection
      ctx.replyWithAudio(fileDetails.file_id, {
        chat_id: process.env.LOG_CHANNEL,
        caption: `${fileDetails.caption}\n\n\n🆔: <code>${ctx.from.id}</code> \n👤: <code>${ctx.from.first_name}</code> \n🆔: <code>${fileDetails.shortid} </code>\n`,
        parse_mode: "HTML",
        reply_markup: fileDetails.reply_markup ?? null,
      });
    }

    //saving file details to database
    db.saveFile(fileDetails);

    //Sharing public link for saved files
    if (ctx.message.text) {
      ctx.reply("Cannot store text messages for now");
    } else {
      ctx.reply(
        `https://t.me/${process.env.BOT_USERNAME}?start=${fileDetails.shortid}`
      );
    }
  }
};
