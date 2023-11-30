"use server";

import { db } from "@/lib/db";

export async function getEvents(categoryNames: string[], page: number) {
	return await db.events.getFiltered(categoryNames, page);
}
