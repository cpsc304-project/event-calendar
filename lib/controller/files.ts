import { db } from "../db";
import { File } from "../schema/file";

export const add = async ({ url, user_id }: Omit<File, "id">): Promise<File | undefined> => {
	const [file] = await db.sql<[File?]>`
		INSERT INTO files
			(url, user_id)
		VALUES
			(${url}, ${user_id})
		RETURNING
			id,
			url,
			user_id
	`;

	return file;
};

export const getAll = async (): Promise<File[]> => {
	const files = await db.cached(
		"all-files",
		db.sql<File[]>`
			SELECT
				id,
				url,
				user_id
			FROM
				files
			ORDER BY
				id DESC
		`,
	);

	return files;
};
