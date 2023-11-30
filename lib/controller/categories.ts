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
