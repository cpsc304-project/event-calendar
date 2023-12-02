import { db } from "../db";
import { Account, Review, ReviewGetAllByEventId } from "../schema";
import { createKindeManagementAPIClient } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getAllByEventId(event_id: number): Promise<ReviewGetAllByEventId[]> {
	const reviews = await db.sql<any[]>`
			SELECT
				review_id,
				rating,
				comment,
				event_id
			FROM review
			WHERE event_id = ${event_id}
		`;
	return reviews;
}

export async function create(
	rating: number,
	comment: string,
	account_id: number,
	event_id: number,
): Promise<Review> {
	const review = await db.sql<Review[]>`
		INSERT INTO review (rating, comment, account_id, event_id)
		VALUES (${rating}, ${comment}, ${account_id}, ${event_id})
		RETURNING review_id, rating, comment, account_id, event_id
	`;
	return review[0];
}
