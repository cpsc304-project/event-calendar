"use server";

import { db } from "@/lib/db";

export async function getEvents(categoryNames: string[], page: number) {
	return await db.events.getFiltered(categoryNames, page);
}

export async function getGreatDeals(page: number) {
	return await db.events.getGreatDeals(page);
}

export async function getPopularEvents(page: number) {
	return await db.events.getPopularEvents(page);
}
