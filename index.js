import dotenv from "dotenv";
dotenv.config();
import { Bot } from "grammy";
import { start } from "./Controllers/Start.js";
import { db } from "./Database/Actions/Queries.js";
import { connect } from "./Database/Config/Connection.js";

const bot = new Bot(process.env.BOT_TOKEN);

//Database connection
connect();

bot.command("start", start);

bot.start();
