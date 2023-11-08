import { db } from "../db";
import { File } from "../schema/file";

export async function add({ url, userId }: Omit<File, "id">): Promise<File> {
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
}

export async function get(id: number): Promise<File | undefined> {
	const [file] = await db.cached(
		`file-${id}`,
		db.sql<[File?]>`
			SELECT
				id,
				url,
				user_id as userId
			FROM
				files
			WHERE
				id = ${id}
		`,
	);

	return file;
}

export async function getAll(): Promise<File[]> {
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
}
