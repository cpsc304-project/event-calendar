"use server";

import { db } from "@/lib/db";

export async function getEvents(
	categoryNames: string[],
	popular: boolean,
	deals: boolean,
	page: number,
) {
	if (popular) {
		return await db.events.getPopular(page);
	} else if (deals) {
		return await db.events.getDeals(page);
	} else {
		return await db.events.getFiltered(categoryNames, page);
	}
}
