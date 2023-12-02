import { db } from "../db";
import { Logger } from "next-axiom";
import { Account, Guest, Organizer } from "../schema";

export async function getByKindeId(kindeId: string): Promise<Account> {
	const logger = new Logger();
	try {
		const [account] = await db.sql<[Account?]>`
		INSERT INTO account
			(kinde_id)
		VALUES
			(${kindeId})
		ON CONFLICT (kinde_id) DO UPDATE
		SET
			kinde_id = account.kinde_id
		RETURNING
			account_id,
			kinde_id
	`;

		if (!account) {
			throw new Error("Failed to upsert account by Kinde ID: no account returned.");
		}

		logger.debug("Account", account);

		return account;
	} finally {
		logger.flush();
	}
}

export async function getOrganizer(accountId: number): Promise<Organizer | undefined> {
	const logger = new Logger();
	try {
		const [organizer] = await db.sql<[Organizer?]>`
		SELECT
			account_id,
			organization_name
		FROM
			organizer
		WHERE
			account_id = ${accountId}
	`;

		logger.debug("Organizer", organizer);

		return organizer;
	} finally {
		logger.flush();
	}
}

export async function insertOrganizer(
	account_id: number,
	organization_name: string,
): Promise<Organizer> {
	const logger = new Logger();
	try {
		const [organizer] = await db.sql<[Organizer?]>`
		INSERT INTO organizer
			(account_id, organization_name)
		VALUES
			(${account_id}, ${organization_name})
			ON CONFLICT (account_id) DO UPDATE
		SET
			organization_name = EXCLUDED.organization_name
		RETURNING
			account_id,
			organization_name
	`;

		if (!organizer) {
			throw new Error("Failed to insert organizer, no organizer returned.");
		}

		logger.debug("Inserted Organizer", organizer);

		return organizer;
	} finally {
		logger.flush();
	}
}

export async function getGuest(accountId: number): Promise<Guest | undefined> {
	const logger = new Logger();
	try {
		const [guest] = await db.sql<[Guest?]>`
		SELECT
			account_id,
			is_ubc_student
		FROM
			guest
		WHERE
			account_id = ${accountId}
	`;

		logger.debug("Guest", guest);

		return guest;
	} finally {
		logger.flush();
	}
}

export async function insertGuest(account_id: number, is_ubc_student: boolean): Promise<Guest> {
	const logger = new Logger();
	try {
		const [guest] = await db.sql<[Guest?]>`
		INSERT INTO guest
			(account_id, is_ubc_student)
		VALUES
			(${account_id}, ${is_ubc_student})
		RETURNING
		account_id, is_ubc_student
	`;

		if (!guest) {
			throw new Error("Failed to insert guest, no guest returned.");
		}

		logger.debug("Inserted Guest", guest);

		return guest;
	} finally {
		logger.flush();
	}
}
