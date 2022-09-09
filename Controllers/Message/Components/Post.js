import { db } from "../../../Database/Actions/Queries.js";

export const broadcastpost = async (ctx) => {
  await db.checkUser(ctx.from.id).then(async (user) => {
    if (user?.admin || ctx.from.id == process.env.ADMIN_ID) {
      let post = {};
      // Categorizing post type

      if (ctx.message.photo) {
        //if post is photo
        post.type = "photo";
        post.file_id = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        {
          ctx.message.caption ? (post.caption = ctx.message.caption) : "";
        }
        {
          ctx.message.reply_markup
            ? (post.reply_markup = ctx.message.reply_markup)
            : "";
        }
      } else if (ctx.message.animation) {
        //if post is animation /gif
        post.type = "animation";
        post.file_id = ctx.message.animation.file_id;
        {
          ctx.message.caption ? (post.caption = ctx.message.caption) : "";
        }
        {
          ctx.message.reply_markup
            ? (post.reply_markup = ctx.message.reply_markup)
            : "";
        }
      } else if (ctx.message.video) {
        //if post is video
        post.type = "video";
        post.file_id = ctx.message.video.file_id;
        {
          ctx.message.caption ? (post.caption = ctx.message.caption) : "";
        }
        {
          ctx.message.reply_markup
            ? (post.reply_markup = ctx.message.reply_markup)
            : "";
        }
      } else if (ctx.message.document) {
        post.type = "document";
        post.file_id = ctx.message.document.file_id;
        {
          ctx.message.caption ? (post.caption = ctx.message.caption) : "";
        }
        {
          ctx.message.reply_markup
            ? (post.reply_markup = ctx.message.reply_markup)
            : "";
        }
      } else if (ctx.message.text) {
        post.type = "text";
        post.text = ctx.message.text;
        {
          ctx.message.reply_markup
            ? (post.reply_markup = ctx.message.reply_markup)
            : "";
        }
      }

      await db.getBroadcastPost().then((res) => {
        if (res?.length < 1) {
          post.id = 1;
          db.savePost(post).then((data) => {
            if (data) {
              ctx.reply(`<b>PostId:</b> <code>${data.id ?? 1}</code>`, {
                parse_mode: "HTML",
              });
            } else {
              ctx.reply(`☣ Something went wrong`);
            }
          });
        } else {
          let lastid = parseInt(res[res.length - 1].id);
          post.id = lastid + 1;
          db.savePost(post).then((data) => {
            if (data) {
              ctx.reply(`<b>PostId:</b> <code>${post.id}</code>`, {
                parse_mode: "HTML",
              });
            } else {
              ctx.reply(`☣ Something went wrong`);
            }
          });
        }
      });
    } else {
      ctx.reply(`☣ Something went wrong`);
    }
  });
};
