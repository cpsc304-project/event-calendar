import { db } from "../db";
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
