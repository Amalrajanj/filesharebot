import dotenv from "dotenv";
dotenv.config();
import { Bot } from "grammy";
import {
  addnewAdminQuestion,
  manageadminCallback,
  removeAdminQuestion,
} from "./Controllers/Action/Admin.js";
import { CheckChannel } from "./Controllers/Action/Channel.js";
import {
  handleConfigCallback,
  setChannelIDQuestion,
  setChannelLinkQuestion,
  setWelcomeQuestion,
} from "./Controllers/Action/Configbot.js";
import {
  deleteallcallback,
  managefilesCallback,
  removebatchfileQuestion,
  removeonefileQuestion,
} from "./Controllers/Action/Deletefiles.js";
import {
  botstatus,
  deleteall,
  deletefiles,
  manageadmins,
} from "./Controllers/Hears/Admin.js";
import { configbot } from "./Controllers/Hears/Configbot.js";
import {
  banuser,
  banuserQuestion,
  unbanuser,
  unbanuserQuestion,
} from "./Controllers/Hears/Mangageuser.js";
import { message } from "./Controllers/Message/Message.js";
import { start } from "./Controllers/Start/Start.js";
import { db } from "./Database/Actions/Queries.js";
import { connect } from "./Database/Config/Connection.js";

const bot = new Bot(process.env.BOT_TOKEN);

//Database connection
connect();

//Middlewares
bot.use(addnewAdminQuestion.middleware());
bot.use(removeAdminQuestion.middleware());
bot.use(removebatchfileQuestion.middleware());
bot.use(removeonefileQuestion.middleware());
bot.use(banuserQuestion.middleware());
bot.use(unbanuserQuestion.middleware());
bot.use(setChannelIDQuestion.middleware());
bot.use(setChannelLinkQuestion.middleware());
bot.use(setWelcomeQuestion.middleware());

// START
bot.command("start", start);

//HEARS
bot.hears("👤 Manage admins", manageadmins);
bot.hears("📊 Bot status", botstatus);
bot.hears("🗑 Delete files", deletefiles);
bot.hears("☢ Delete all", deleteall);
bot.hears("🛑 Ban", banuser);
bot.hears("♻ Unban", unbanuser);
bot.hears("⚙ Config bot", configbot);

// MESSAGES AND FILES
bot.on("message", message);

// CALLBACKS
bot.callbackQuery(/(.*)_ADMIN/g, manageadminCallback);
bot.callbackQuery(/(.*)_FILE/g, managefilesCallback);
bot.callbackQuery("CONFIRMREMOVEALLFILES", deleteallcallback);
bot.callbackQuery(/SET_(.*)/g, handleConfigCallback);
bot.callbackQuery("CHECK_CHANNEL", CheckChannel);
// Bot config
bot.start();
