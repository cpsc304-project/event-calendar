"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function insertOrganizer(account_id: number, name: string) {
	if (!name) {
		throw new Error("Failed to insert organizer, no name given.");
	}
	const organizer = await db.accounts.insertOrganizer(account_id, name);
	revalidatePath("/dashboard/organizer");
	return organizer;
}