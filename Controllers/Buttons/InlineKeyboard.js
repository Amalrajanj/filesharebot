import { Keyboard } from "grammy";

export const Adminkeyboard = new Keyboard()
  .text("👤 Manage admins")
  .text("⚙ Config bot")
  .row()
  .text("📊 Bot status")
  .row()
  .text("🗑 Delete files")
  .text("☢ Delete all")
  .row()
  .text("🛑 Ban")
  .text("♻ Unban")
  .row()
  .text("💌 Broadcast")
  .resized();

export const SubAdminkeyboard = new Keyboard()
  .text("📊 Bot status")
  .row()
  .text("🗑 Delete files")
  .row()
  .text("🛑 Ban")
  .text("♻ Unban")
  .row()
  .text("💌 Broadcast")
  .resized();
