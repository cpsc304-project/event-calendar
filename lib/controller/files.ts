import { db } from "../db";
import { File } from "../schema/file";

export const add = async ({ url, userId }: Omit<File, "id">): Promise<File> => {
	const [file] = await db.sql<[File?]>`
		INSERT INTO files
			(url, user_id)
		VALUES
			(${url}, ${userId})
		RETURNING
			id,
			url,
			user_id as userId
	`;

	if (!file) {
		throw new Error("Failed to insert file, no file returned.");
	}

	return file;
};

export const getAll = async (): Promise<File[]> => {
	const files = await db.cached(
		"all-files",
		db.sql<File[]>`
			SELECT
				id,
				url,
				user_id as userId
			FROM
				files
			ORDER BY
				id DESC
		`,
	);

	return files;
};
