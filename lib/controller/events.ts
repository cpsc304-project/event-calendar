import { db } from "../db";
import { Event } from "../schema/event";

export async function addEvent({
	description, startDate, endDate, name, venue, organiser,
  category} : Omit<Event, "id"> ): Promise<Event> {

	const [events] = await db.sql<[Event?]>`
	INSERT INTO events
	  (description, startDate, endDate, name, venue, organiser, category)
	VALUES
	  (${description}, ${startDate}, ${endDate}, ${name}, ${venue}, ${organiser},
	  ${category})
	RETURNING
	  description,
		startDate,
		endDate,
		name,
		venue,
		organiser,
		category,
	  id
`;


if (!events) {
	throw new Error("Was unable to insert an event. No event returned");
}

return events;
};

export async function deleteEvent (id: number): Promise<void> {
	const deleteEvent = await db.sql`
	DELETE FROM events
	WHERE id = $(id)
	RETURNING
	id;
	`;

	if (!deleteEvent) {
		throw new Error('Was unable to delete event')
	}



}

