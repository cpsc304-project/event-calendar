"use server";

import { db } from "@/lib/db";

export async function getEvents(page: number) {
	return await db.events.getAll(page);
}
