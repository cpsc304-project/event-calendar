import { db } from "../db";
import { File } from "../schema";

export async function add({ url, account_id }: Omit<File, "file_id">): Promise<File> {
	const [file] = await db.sql<[File?]>`
		INSERT INTO file
			(account_id, url)
		VALUES
			(${account_id}, ${url})
		RETURNING
			file_id,
			account_id,
			url
	`;

	if (!file) {
		throw new Error("Failed to insert a file: no file returned.");
	}

	return file;
}

export async function get(file_id: number): Promise<File | undefined> {
	const [file] = await db.cached(
		`file-${file_id}`,
		db.sql<[File?]>`
			SELECT
				file_id,
				account_id,
				url
			FROM
				file
			WHERE
				file_id = ${file_id}
		`,
	);

	return file;
}

export async function getAll(): Promise<File[]> {
	const files = await db.cached(
		"all-files",
		db.sql<File[]>`
			SELECT
				file_id,
				account_id,
				url
			FROM
				file
			ORDER BY
				file_id DESC
		`,
	);

	return files;
}
