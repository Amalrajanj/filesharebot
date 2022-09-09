import { db } from "../../Database/Actions/Queries.js";
import { filehandler } from "./Components/File.js";
import { broadcastpost } from "./Components/Post.js";

export const message = async (ctx) => {
  if (
    ctx.message.forward_from &&
    ctx.message.forward_from.id == process.env.POST_BOT_ID
  ) {
    broadcastpost(ctx);
  } else {
    filehandler(ctx);
  }
};
