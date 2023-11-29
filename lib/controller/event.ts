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

export async function deleteEvent (id: number): Promise<void> {
	const [deleteEvent] = await db.sql<[Event?]>`
	DELETE FROM events
	WHERE id = $(id)
	`;

	if (!deleteEvent) {
		throw new Error('Was unable to delete event')
	}

}

export async function updateEvent({
	description,
	startDate,
	endDate,
	name,
	venue,
	organiser,
	category
}: Omit<Event, "id">): Promise<Event> {
	
	const [updateEvent] = await db.sql<[Event?]> `
	UPDATE Events
	SET
	  description = ${description},
    startDate = ${startDate},
    endDate = ${endDate},
    name = ${name},
    venue = ${venue},
    organiser = ${organiser},
    category = ${category}
	WHERE
	  id = $(id)
	RETURNING
	  id,
	  description,
	  startDate,
	  endDate,
	  name,
	  venue,
	  organiser,
	  category`;

if (!updateEvent) {
	throw new Error('Was unable to update event')
		}

return updateEvent;
		
}