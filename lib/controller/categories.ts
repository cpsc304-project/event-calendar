import { db } from "../db";
import { Category } from "../schema";

export async function getAll(): Promise<Category[]> {
	const categories = await db.cached(
		"all-categories",
		db.sql<Category[]>`
			SELECT
				category_name,
				description
			FROM category
		`,
	);

	return categories;
}

export async function insertEventInCategory(event_id: number, category_name: string) {
	const categories = await db.sql<any>`
		INSERT INTO event_in_category 
			(event_id, category_name)
		VALUES
			(${event_id}, ${category_name})
		RETURNING
			event_id,
			category_name
	`;

	return categories;
}
