// INSERT INTO ticket (event_id, account_id, cost)
// SELECT
//     1 AS event_id,
//     101 AS account_id,
//     50.00 AS cost
// FROM generate_series(1, n);

import { db } from "../db";
import { Logger } from "next-axiom";
import { Ticket, TicketInfo } from "../schema";

export async function insertNTickets(
	event_id: number,
	cost: number,
	number_of_tickets: number,
): Promise<Ticket[]> {
	const logger = new Logger();
	try {
		if (number_of_tickets < 1) {
			throw new Error("Failed to insert tickets, number of tickets must be greater than 0.");
		}

		const tickets = await db.sql<Ticket[]>`
			INSERT INTO ticket (event_id, account_id, cost)
			SELECT
				${event_id} AS event_id,
				NULL AS account_id,
				${cost} AS cost
			FROM generate_series(1, ${number_of_tickets})
			RETURNING *;
		`;

		if (tickets.length === 0) {
			throw new Error("Failed to insert tickets");
		}

		logger.debug("Inserted Organizer", { tickets });

		return tickets;
	} finally {
		logger.flush();
	}
}

export async function getNumberAvailable(event_id: number): Promise<number> {
	const logger = new Logger();
	try {
		const [ticketNumber] = await db.sql<[{ tickets_available: number }?]>`
			SELECT COUNT(ticket.ticket_id)::int AS tickets_available
			FROM ticket
			LEFT JOIN guest ON ticket.account_id = guest.account_id
			WHERE ticket.event_id = ${event_id}
			AND ticket.account_id IS NULL;
	`;

		if (!ticketNumber) {
			throw new Error("Failed to get tickets, no tickets returned.");
		}

		logger.debug("Number Tickets Available: " + ticketNumber.tickets_available);

		return ticketNumber.tickets_available;
	} finally {
		logger.flush();
	}
}

export async function getAvailableOne(event_id: number): Promise<Ticket | undefined> {
	const logger = new Logger();
	try {
		const [ticket] = await db.sql<[Ticket?]>`
		SELECT *
		FROM ticket
		LEFT JOIN guest ON ticket.account_id = guest.account_id
		WHERE ticket.event_id = ${event_id}
		AND ticket.account_id IS NULL;
	`;

		logger.debug("Available Ticket", { ticket });

		return ticket;
	} finally {
		logger.flush();
	}
}

export async function getAvailableDiscountedOne(event_id: number): Promise<Ticket | undefined> {
	const logger = new Logger();
	try {
		const [ticket] = await db.sql<[Ticket?]>`
			SELECT *
			FROM discounted_ticket
			JOIN ticket ON discounted_ticket.ticket_id = ticket.ticket_id
			LEFT JOIN guest ON ticket.account_id = guest.account_id
			WHERE ticket.event_id = ${event_id}
			AND ticket.account_id IS NULL;
		`;

		logger.debug("Available Discounted Ticket", { ticket });

		return ticket;
	} finally {
		logger.flush();
	}
}

export async function setAccount(
	ticket_id: string,
	event_id: number,
	account_id: number,
): Promise<Ticket> {
	const logger = new Logger();
	try {
		logger.debug("Set Account Params", { ticket_id, event_id, account_id });

		const [ticket] = await db.sql<[Ticket?]>`
			UPDATE ticket
			SET account_id = ${account_id}
			WHERE ticket_id = ${ticket_id} AND event_id = ${event_id}
			RETURNING *
		`;

		if (!ticket) {
			throw new Error("Failed to set account, no ticket returned.");
		}

		logger.debug("Set Account", { ticket });

		return ticket;
	} finally {
		logger.flush();
	}
}

export async function getByAccountId(account_id: number): Promise<Ticket[]> {
	const logger = new Logger();
	try {
		const tickets = await db.sql<Ticket[]>`
			SELECT *
			FROM ticket
			WHERE account_id = ${account_id};
		`;

		logger.debug("Tickets for account", { account_id, tickets });

		return tickets;
	} finally {
		logger.flush();
	}
}

export async function getInfoByAccountId(account_id: number): Promise<TicketInfo[]> {
	const logger = new Logger();
	try {
		const tickets = await db.sql<TicketInfo[]>`
			SELECT *
			FROM ticket
			JOIN event e ON ticket.event_id = e.event_id
			WHERE account_id = ${account_id};
		`;

		logger.debug("Tickets for account", { account_id, tickets });

		return tickets;
	} finally {
		logger.flush();
	}
}

export async function getByAccountAndEventId(
	account_id: number,
	event_id: number,
): Promise<Ticket[]> {
	const logger = new Logger();
	try {
		const tickets = await db.sql<Ticket[]>`
			SELECT *
			FROM ticket
			WHERE account_id = ${account_id} AND event_id = ${event_id};
		`;

		logger.debug("Tickets for account", { account_id, event_id, tickets });

		return tickets;
	} finally {
		logger.flush();
	}
}
