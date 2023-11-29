import { db } from "../db";
import { Logger } from "../logger";
import { Account } from "../schema/accounts";

export async function getByKindeId(kindeId: string): Promise<Account> {
	using logger = new Logger();

	const [account] = await db.sql<[Account?]>`
		INSERT INTO account
			(kinde_id)
		VALUES
			(${kindeId})
		ON CONFLICT (kinde_id) DO UPDATE
		SET
			kinde_id = account.kinde_id
		RETURNING
			account_id as "accountId",
			kinde_id as "kindeId"
	`;

	if (!account) {
		throw new Error("Failed to upsert account by Kinde ID: no account returned.");
	}

	logger.debug("Account", account);

	return account;
}
