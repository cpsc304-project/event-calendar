import { db, dbCached } from "../db";
import { Message } from "../schema/message";

export const add = async (fields: Omit<Message, "id">): Promise<Message> => {
	const result = await db.execute(
		`
			INSERT INTO messages
				(title, content)
			VALUES
				(:title, :content)
		`,
		fields,
	);

	return {
		...fields,
		id: +result.insertId,
	};
};

export const getAll = async (): Promise<Message[]> => {
	const result = await dbCached.execute(
		`
			SELECT
				id, title, content
			FROM messages
		`,
		null,
		{ tags: ["all-messages"] },
	);

	return result.rows as Message[];
};
