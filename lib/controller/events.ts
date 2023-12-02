import { RESULTS_PER_QUERY } from "../constants";
import { db } from "../db";
import { Logger } from "next-axiom";
import {
	Area,
	Category,
	Event,
	EventGetByEventId,
	EventInCategory,
	EventWithVenueAndAreaAndCategories,
	NewEvent,
	Venue,
} from "../schema";
import { insertNTickets } from "./tickets";

export async function getFiltered(filterCategories: string[], page: number): Promise<Event[]> {
	const limit = RESULTS_PER_QUERY;
	const offset = page * limit;

	const events = await db.cached(
		"all-events",
		db.sql<Event[]>`
			SELECT DISTINCT
				e.event_id,
				e.name,
				e.description,
				e.start_date,
				e.end_date,
				e.organizer_id,
				e.venue_id
			FROM
				event AS e
			LEFT JOIN event_in_category AS ec ON e.event_id = ec.event_id
					AND (array_length(${filterCategories}::varchar[], 1) IS NULL OR ec.category_name = ANY (${filterCategories}))
			INNER JOIN category as c ON ec.category_name = c.category_name
			LIMIT ${limit} OFFSET ${offset}
		`,
	);

	return events;
}

export async function createWithCategories(newEvent: NewEvent): Promise<Event> {
	const logger = new Logger();
	try {
		const {
			name,
			description,
			start_date,
			end_date,
			organizer_id,
			venue_id,
			category_names,
			ticket_count,
			ticket_cost,
		} = newEvent;

		const [event] = await db.sql<[Event?]>`
		INSERT INTO event
			(name, description, start_date, end_date, organizer_id, venue_id)
		VALUES
			(${name}, ${description}, ${start_date}, ${end_date}, ${organizer_id}, ${venue_id})
		RETURNING
		  event_id, name, description, start_date, end_date, organizer_id, venue_id
	`;

		if (!event) {
			throw new Error("Failed to insert an event: no event returned.");
		}

		let event_in_categories: EventInCategory[] = [];

		for (const category_name of category_names) {
			const [event_in_category] = await db.sql<[EventInCategory?]>`
			INSERT INTO event_in_category
				(event_id, category_name)
			VALUES
				(${event.event_id}, ${category_name})
			RETURNING
				event_id, category_name
		`;

			if (!event_in_category) {
				throw new Error("Failed to insert a category: no category returned.");
			}

			event_in_categories.push(event_in_category);
		}

		const costInCents =
			parseInt(ticket_cost.toString().split(".")[0], 10) * 100 +
			parseInt(ticket_cost.toString().split(".")[1], 10);

		await insertNTickets(event.event_id, costInCents, ticket_count);

		logger.debug("events.createWithCategories", { event, event_in_categories });

		return event;
	} finally {
		logger.flush();
	}
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
	ticket_count,
	ticket_cost,
	start_date,
	end_date,
	category_names,
}: Partial<
	Omit<Event, "venue_id" | "organizer_id"> & {
		ticket_count: number;
		ticket_cost: number;
		category_names: string[];
	}
> &
	Pick<Event, "event_id">): Promise<Event> {
	const [existingEvent] = await db.sql<[(Event & { ticket_count: number })?]>`
		SELECT
			event_id,
			name,
			description,
			start_date,
			end_date,
			organizer_id,
			venue_id,
			(SELECT COUNT(*) FROM ticket as t WHERE t.event_id = e.event_id) as ticket_count
		FROM
			event as e
		WHERE
			e.event_id = ${event_id}
	`;

	if (!existingEvent) {
		throw new Error("No event with that id exists");
	}

	const [updatedEvent] = await db.sql<[Event?]>`
		UPDATE event
		SET
			name = ${name ?? existingEvent.name},
			description = ${description ?? existingEvent.description},
			start_date = ${start_date ?? existingEvent.start_date},
			end_date = ${end_date ?? existingEvent.end_date}
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

	if (!updatedEvent) {
		throw new Error("Was unable to update event");
	}

	if (ticket_count !== undefined && ticket_cost !== undefined) {
		const costInCents =
			parseInt(ticket_cost.toString().split(".")[0], 10) * 100 +
			parseInt(ticket_cost.toString().split(".")[1], 10);

		await insertNTickets(
			updatedEvent.event_id,
			costInCents,
			ticket_count - existingEvent.ticket_count,
		);
	}

	if (category_names !== undefined) {
		await db.sql`
			DELETE FROM event_in_category
			WHERE event_id = ${event_id}
		`;

		for (const category_name of category_names) {
			const [event_in_category] = await db.sql<[EventInCategory?]>`
				INSERT INTO event_in_category
					(event_id, category_name)
				VALUES
					(${event_id}, ${category_name})
				RETURNING
					event_id, category_name
			`;

			if (!event_in_category) {
				throw new Error("Failed to insert a category: no category returned.");
			}
		}
	}

	return updatedEvent;
}

export async function getByOrganizerId(organizer_id: number): Promise<Event[]> {
	const logger = new Logger();
	try {
		const events = await db.sql<Event[]>`
			SELECT
				event_id,
				name,
				description,
				start_date,
				end_date,
				organizer_id,
				venue_id
			FROM
				event
			WHERE
				organizer_id = ${organizer_id}
		`;
		logger.debug("Event: getByOrganizerId", events);
		return events;
	} finally {
		logger.flush();
	}
}

export async function getByEventId(event_id: number): Promise<EventGetByEventId> {
	const logger = new Logger();
	try {
		const [event] = await db.sql<[EventGetByEventId]>`
			SELECT
				e.event_id,
				e.name as event_name,
				e.description as event_description,
				e.start_date,
				e.end_date,
				v.name as venue_name,
				v.description as venue_description,
				v.seats as venue_seats,
				v.street_number AS venue_street_number,
				v.street_name AS venue_street_name,
				v.country AS venue_country,
				v.postal_code AS venue_postal_code,		
				vt.venue_type_name as venue_type_name,
				vt.description as venue_type_description,
				c.category_name as category_name,
				c.description as category_description,
				a.city as venue_city,
				a.province as venue_province,
				o.organization_name as organizer_name,
				o.account_id as organizer_id
			FROM
				event e
			JOIN venue v ON e.venue_id = v.venue_id
			JOIN venue_type vt ON v.venue_type_name = vt.venue_type_name
			JOIN event_in_category ec ON e.event_id = ec.event_id
			JOIN category c ON ec.category_name = c.category_name
			JOIN area a ON v.postal_code = a.postal_code AND v.country = a.country
			JOIN organizer o ON e.organizer_id = o.account_id
			WHERE
				e.event_id = ${event_id}
			LIMIT 1
		`;
		logger.debug("events.getByEventId", { event });
		return event;
	} finally {
		logger.flush();
	}
}

type DealEvents = Event & { average_ticket_cost: number; average_category_cost: number };

export async function getDeals(page: number): Promise<DealEvents[]> {
	const limit = RESULTS_PER_QUERY;
	const offset = page * limit;

	const events = await db.cached(
		"all-events",
		db.sql<DealEvents[]>`
			SELECT
				e.event_id,
				e.name,
				e.description,
				e.start_date,
				e.end_date,
				e.organizer_id,
				e.venue_id,
				AVG(t.cost) AS average_ticket_cost,
				(
					SELECT
						AVG(t2.cost)
					FROM
						ticket t2
						JOIN event_in_category ec2 ON t2.event_id = ec2.event_id
					WHERE
						ec2.category_name = ec.category_name
					GROUP BY
						ec2.category_name) AS average_category_cost
				FROM
					event e
					JOIN event_in_category ec ON e.event_id = ec.event_id
					JOIN ticket t ON e.event_id = t.event_id
				GROUP BY
					e.event_id,
					e.name,
					ec.category_name
				HAVING
					AVG(t.cost) <= (
					SELECT
						AVG(t2.cost)
					FROM
						ticket t2
						JOIN event_in_category ec2 ON t2.event_id = ec2.event_id
					WHERE
						ec2.category_name = ec.category_name
					GROUP BY
						ec2.category_name)
				LIMIT ${limit} OFFSET ${offset}
		`,
	);

	return events;
}

export async function getPopular(page: number): Promise<Event[]> {
	const limit = RESULTS_PER_QUERY;
	const offset = page * limit;
	const magicNumber = 3;

	const events = await db.cached(
		"all-events",
		db.sql<Event[]>`
			SELECT DISTINCT
				e.event_id,
				e.name,
				e.description,
				e.start_date,
				e.end_date,
				e.organizer_id,
				e.venue_id
			FROM
				event e
				LEFT JOIN ticket t ON e.event_id = t.event_id
			WHERE
				t.account_id IS NOT NULL
			GROUP BY
				e.event_id,
				e.name
			HAVING
				COUNT(t.ticket_id) > ${magicNumber}
			LIMIT ${limit} OFFSET ${offset}
		`,
	);

	return events;
}

type Prefixed<T extends Record<string, any>, P extends string> = {
	[K in keyof T as K extends string ? (K extends `${P}_${string}` ? K : `${P}_${K}`) : never]: T[K];
};

type RawEventWithVenueAndAreaAndCategories = Event &
	Prefixed<Venue, "venue"> &
	Prefixed<Area, "area"> &
	Partial<Prefixed<Category, "category">> & { ticket_count: number };

export async function getWithVenueAndAreaAndCategories(
	event_id: number,
): Promise<EventWithVenueAndAreaAndCategories> {
	const logger = new Logger();
	try {
		const rawEvents = await db.sql<RawEventWithVenueAndAreaAndCategories[]>`
		SELECT
			e.event_id,
			e.name,
			e.description,
			e.start_date,
			e.end_date,
			e.organizer_id,
			v.venue_id,
			v.name AS venue_name,
			v.description AS venue_description,
			v.seats AS venue_seats,
			v.venue_type_name,
			v.postal_code AS venue_postal_code,
			v.country AS venue_country,
			v.street_number AS venue_street_number,
			v.street_name AS venue_street_name,
			a.city AS area_city,
			a.province AS area_province,
			c.category_name,
			c.description AS category_description,
			(
				SELECT
					COUNT(*)::int
				FROM
					ticket AS t
				WHERE
					t.event_id = e.event_id
			) AS ticket_count
		FROM
			event AS e
		INNER JOIN venue AS v ON e.venue_id = v.venue_id
		INNER JOIN area AS a ON v.postal_code = a.postal_code AND v.country = a.country
		LEFT JOIN event_in_category AS ec ON e.event_id = ec.event_id
		LEFT JOIN category AS c ON ec.category_name = c.category_name
		WHERE e.event_id = ${event_id}
	`;

		if (rawEvents.length === 0) {
			throw new Error(`No event with id ${event_id} found.`);
		}

		const rawEvent = rawEvents[0];

		const event: EventWithVenueAndAreaAndCategories = {
			event_id: rawEvent.event_id,
			name: rawEvent.name,
			description: rawEvent.description,
			ticket_count: rawEvent.ticket_count,
			start_date: rawEvent.start_date,
			end_date: rawEvent.end_date,
			organizer_id: rawEvent.organizer_id,
			venue_id: rawEvent.venue_id,
			venue: {
				venue_id: rawEvent.venue_id,
				name: rawEvent.venue_name,
				description: rawEvent.venue_description,
				seats: rawEvent.venue_seats,
				venue_type_name: rawEvent.venue_type_name,
				postal_code: rawEvent.venue_postal_code,
				country: rawEvent.venue_country,
				street_number: rawEvent.venue_street_number,
				street_name: rawEvent.venue_street_name,
				city: rawEvent.area_city,
				province: rawEvent.area_province,
			},
			categories: [],
		};

		for (const rawEvent of rawEvents) {
			if (!rawEvent.category_name || !rawEvent.category_description) break;
			event.categories.push({
				category_name: rawEvent.category_name,
				description: rawEvent.category_description,
			});
		}

		logger.debug("events.getWithVenueAndAreaAndCategories", { event });

		return event;
	} finally {
		logger.flush();
	}
}
