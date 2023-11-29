import { db } from "../db";
import { File } from "../schema/file";

export async function add({ url, accountId }: Omit<File, "fileId">): Promise<File> {
	const [file] = await db.sql<[File?]>`
		INSERT INTO file
			(account_id, url)
		VALUES
			(${accountId}, ${url})
		RETURNING
			file_id as "fileId",
			account_id as "accountId",
			url
	`;

	if (!file) {
		throw new Error("Failed to insert a file: no file returned.");
	}

	return file;
}

export async function get(fileId: number): Promise<File | undefined> {
	const [file] = await db.cached(
		`file-${fileId}`,
		db.sql<[File?]>`
			SELECT
				file_id as "fileId",
				account_id as "accountId",
				url
			FROM
				file
			WHERE
				file_id = ${fileId}
		`,
	);

	return file;
}

export async function getAll(): Promise<File[]> {
	const files = await db.cached(
		"all-files",
		db.sql<File[]>`
			SELECT
				file_id as "fileId",
				account_id as "accountId",
				url
			FROM
				file
			ORDER BY
				file_id DESC
		`,
	);

	return files;
}
