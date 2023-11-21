import { db } from "../db";
import { Event } from "../schema/event";

export async function addEvent({
	description,
	startDate,
	endDate,
	name,
	venue,
	organiser,
	category,
}: Omit<Event, "id">): Promise<Event> {
	const [event] = await db.sql<[Event?]>`
		INSERT INTO events
			(description, startDate, endDate, name, venue, organiser, category)
		VALUES
			(${description}, ${startDate}, ${endDate}, ${name}, ${venue}, ${organiser}, ${category})
		RETURNING
			id,
			description,
			startDate,
			endDate,
			name,
			venue,
			organiser,
			category
	`;

	if (!event) {
		throw new Error("Failed to insert an event: no event returned.");
	}

	return event;
}
