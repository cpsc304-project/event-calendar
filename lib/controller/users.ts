import { db } from "../db";
import { User } from "../schema/user";

export async function getByKindeId(kindeId: string): Promise<User> {
	const [user] = await db.sql<[User?]>`
		INSERT INTO users
			(kinde_id)
		VALUES
			(${kindeId})
		ON CONFLICT (kinde_id) DO UPDATE
		SET
			kinde_id = users.kinde_id
		RETURNING
			id,
			kinde_id as kindeId
	`;

	if (!user) {
		throw new Error("Failed to upsert user by Kinde ID, no user returned.");
	}

	return user;
}
