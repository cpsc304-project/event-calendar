import { int, mysqlTable, text } from "drizzle-orm/mysql-core";
import { zfd } from "zod-form-data";

export const messages = mysqlTable("messages", {
	id: int("id").primaryKey().autoincrement(),
	title: text("title").notNull(),
	content: text("content").notNull(),
});

export type Message = typeof messages.$inferSelect;

export const MessageForm = zfd.formData({
	title: zfd.text(),
	content: zfd.text(),
});
