import { db } from "../../Database/Actions/Queries.js";

export const UserStart = (ctx) => {
  console.log("user", ctx.from.id);
};
