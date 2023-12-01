import { db } from "../db";
import { Review, ReviewGetAllByEventId } from "../schema";

export async function getAllByEventId(event_id: number): Promise<ReviewGetAllByEventId[]> {
	const reviews = await db.sql<Review[]>`
			SELECT
				review_id,
				rating,
				comment,
				account_id,
				event_id
			FROM review
			WHERE event_id = ${event_id}
		`;
	return reviews;
}

