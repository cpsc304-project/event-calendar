import { db } from "../db";
import { Organizer } from "../schema";

// export async function insertOrganizer(
// 	account_id: number,
// 	organization_name: number,
// ): Promise<Organizer> {
// 	if (!account_id) {
// 		throw new Error("Failed to insert organizer, no account_id given.");
// 	}
// 	if (!organization_name) {
// 		throw new Error("Failed to insert organizer, no organization_name given.");
// 	}
// 	const [organizer] = await db.sql<[Organizer?]>`
// 		INSERT INTO organizers
// 			(account_id, organization_name)
// 		VALUES
// 			(${account_id}, ${organization_name})
// 		RETURNING
// 			account_id,
// 			organization_name
// 	`;

// 	if (!organizer) {
// 		throw new Error("Failed to insert organizer, no organizer returned.");
// 	}

// 	return organizer;
// }
