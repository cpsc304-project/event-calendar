// INSERT INTO ticket (event_id, account_id, cost)
// SELECT
//     1 AS event_id,
//     101 AS account_id,
//     50.00 AS cost
// FROM generate_series(1, n);

import { db } from "../db";
import { Logger } from "../logger";
import { Ticket } from "../schema";

export async function insertNTickets(
	event_id: number,
	cost: number,
	number_of_tickets: number,
): Promise<Ticket[]> {
	using logger = new Logger();
	if (number_of_tickets < 1) {
		throw new Error("Failed to insert tickets, number of tickets must be greater than 0.");
	}
	const tickets = await db.sql<Ticket[]>`
	INSERT INTO ticket (event_id, account_id, cost)
	SELECT
    ${event_id} AS event_id,
    ${cost} AS cost,
	FROM generate_series(1, ${number_of_tickets})
	RETURNING *;
	`;

	if (!tickets) {
		throw new Error("Failed to insert organizer, no organizer returned.");
	}

	logger.debug("Inserted Organizer", tickets);

	return tickets;
}
