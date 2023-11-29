import { db } from "../db";
import { Event } from "../schema";

export async function add({
	description,
	start_date,
	end_date,
	name,
	venue_id,
	organizer_id,
}: Omit<Event, "event_id">): Promise<Event> {
	const [event] = await db.sql<[Event?]>`
		INSERT INTO events
			(name, description, start_date, end_date, organizer_id, venue_id)
		VALUES
			(${name}, ${description}, ${start_date}, ${end_date}, ${organizer_id}, ${venue_id})
		RETURNING
		  event_id,
			name,
			description,
			start_date,
			end_date,
			organizer_id,
			venue_id
	`;

	if (!event) {
		throw new Error("Failed to insert an event: no event returned.");
	}

	return event;
}

export async function remove(event_id: number): Promise<void> {
	await db.sql`
		DELETE FROM event
		WHERE event_id = ${event_id}
	`;
}

export async function update({
	event_id,
	name,
	description,
	start_date,
	end_date,
	organizer_id,
	venue_id,
}: Event): Promise<Event> {
	const [event] = await db.sql<[Event?]>`
		UPDATE event
		SET
			name = ${name}
			description = ${description},
			start_date = ${start_date},
			end_date = ${end_date},
			organizer_id = ${organizer_id},
			venue_id = ${venue_id}
		WHERE
			event_id = ${event_id}
		RETURNING
			event_id,
			name,
			description,
			start_date,
			end_date,
			organizer_id,
			venue_id
	`;

	if (!event) {
		throw new Error("Was unable to update event");
	}

	return event;
}
