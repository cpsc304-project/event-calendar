import { db } from "../db";
<<<<<<< HEAD
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

=======
import { Category, Review, ReviewGetAllByEventId } from "../schema";


export async function GetAllByEventId(event_id: number): Promise<ReviewGetAllByEventId[]> {
  const reviews = await db.sql<ReviewGetAllByEventId[]>`
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
>>>>>>> parent of f72c7f0 (user interface for events page)
