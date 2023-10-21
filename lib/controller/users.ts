import { db } from "../db";
import { User } from "../schema/user";

export const getByKindeId = async (kinde_id: string): Promise<User | undefined> => {
	const [user] = await db.sql<[User?]>`
		INSERT INTO users
			(kinde_id)
		VALUES
			(${kinde_id})
		ON CONFLICT (kinde_id) DO UPDATE
		SET
			kinde_id = users.kinde_id
		RETURNING
			id,
			kinde_id
	`;

	return user;
};
