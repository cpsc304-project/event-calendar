import { db } from "../db";
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
	const result = await db.executeCached(
		`
			SELECT
				id,
				title,
				content
			FROM
				messages
			ORDER BY
				id DESC
		`,
		null,
		{ tags: ["all-messages"] },
	);

	return result.rows as Message[];
};

export const getLatest = async (): Promise<Message | undefined> => {
	const result = await db.executeCached(
		`
			SELECT
				id,
				title,
				content
			FROM
				messages
			ORDER BY
				id DESC
			LIMIT
				1
		`,
		null,
		{ tags: ["latest-message"] },
	);

	const [message] = result.rows as [Message?];

	return message;
};
