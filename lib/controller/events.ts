import { date } from "zod";
import { db } from "../db";
import { Event } from "../schema/event";

export const addEvent = async ({
	description,
	startDate,
	endDate,
	name,
	venue,
	organiser,
	category,
}: Omit<Event, "id">): Promise<Event> => {
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
};
