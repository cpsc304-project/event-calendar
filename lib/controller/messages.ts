import db, { withFetchOptions } from "../db";
import { Message } from "../schema/message";
import { sql } from "drizzle-orm";

export const add = async (fields: Omit<Message, "id">): Promise<Message> => {
	const result = await db.execute(sql`
		INSERT INTO messages
			(title, content)
		VALUES
			(${fields.title}, ${fields.content})
	`);

	return {
		...fields,
		id: +result.insertId,
	};
};

export const getAll = withFetchOptions(
	async (): Promise<Message[]> => {
		const result = await db.execute(sql`
			SELECT
				id, title, content
			FROM messages
		`);

		return result.rows as Message[];
	},
	{ cache: "force-cache", next: { tags: ["all-messages"] } },
);
