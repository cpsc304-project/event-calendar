import { RESULTS_PER_QUERY } from "../constants";
import { db } from "../db";
import { Logger } from "../logger";
import { Event, EventGetByEventId, EventGetByOrganizerId } from "../schema";

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

/*
 * Gets all events associated with an organizer, including venue name, venue type and catergory name
 */
export async function getByOrganizerId(organizer_id: number): Promise<EventGetByOrganizerId[]> {
	using logger = new Logger();

	const events = await db.sql<EventGetByOrganizerId[]>`
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
				c.description as category_description
			FROM
				event e
			JOIN venue v ON e.venue_id = v.venue_id
			JOIN venue_type vt ON v.venue_type_name = vt.venue_type_name
			JOIN event_in_category ec ON e.event_id = ec.event_id
			JOIN category c ON ec.category_name = c.category_name
			WHERE
				organizer_id = ${organizer_id}
		`;
	logger.debug("Event: getByOrganizerId", events);
	return events;
}

// type EventInfo = {
// 	event_id: number;
// 	name: string;
// 	description: string;
// 	start_date: string;
// 	end_date: string;
// 	organizer_id: number;
// 	venue_id: number;
// 	venue_name: string;
// 	venue_type_name: string;
// 	category_name: string;
// }

export async function getByEventId(event_id: number): Promise<EventGetByEventId> {
	using logger = new Logger();
	console.log("event_id", event_id);
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
	logger.debug("Event: getByEventId", event);
	return event;
}

export interface GreatDealsEvents {
	event_id: number;
	name: string;
	description: string;
	start_date: Date;
	end_date: Date;
	organizer_id: number;
	venue_id: number;
	category_name: string;
	average_ticket_cost: number;
}



export async function getGreatDeals(page: number): Promise<GreatDealsEvents[]> {
	const limit = RESULTS_PER_QUERY;
	const offset = page * limit;

	const events = await db.cached(
		"great-deals",
		db.sql<GreatDealsEvents[]>`
		SELECT
		e.event_id,
		e.name as event_name,
		e.description,
		e.start_date,
		e.end_date,
		e.organizer_id,
		e.venue_id
    ec.category_name as category_name,
    AVG(t.cost) AS average_ticket_cost,
    (
        SELECT
            AVG(t2.cost)
        FROM
            ticket t2
        JOIN
            event_in_category ec2 ON t2.event_id = ec2.event_id
        WHERE
            ec2.category_name = ec.category_name
        GROUP BY
            ec2.category_name
    ) AS average_category_cost
		FROM
				event e
		JOIN
				event_in_category ec ON e.event_id = ec.event_id
		JOIN
				ticket t ON e.event_id = t.event_id
		GROUP BY
				e.event_id, e.name, ec.category_name
		HAVING
				AVG(t.cost) <= (
						SELECT
								AVG(t2.cost)
						FROM
								ticket t2
						JOIN
								event_in_category ec2 ON t2.event_id = ec2.event_id
						WHERE
								ec2.category_name = ec.category_name
						GROUP BY
								ec2.category_name
				)
		LIMIT ${limit} OFFSET ${offset};
		`,
	);

	return events;
}

export async function getPopularEvents(filterCategories: string[], page: number): Promise<Event[]> {
	const limit = RESULTS_PER_QUERY;
	const offset = page * limit;
	const magicNumber = 100;

	const events = await db.cached(
		"popular-events",
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
			LEFT JOIN
				ticket t ON e.event_id = t.event_id
			WHERE t.account_id IS NOT NULL
			GROUP BY
				e.event_id, e.name
			HAVING COUNT(t.ticket_id) > ${magicNumber}
			LIMIT ${limit} OFFSET ${offset};
		`,
	);

	return events;
}
