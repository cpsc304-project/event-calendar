"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function buyTicketForAccountId(account_id: number, ticket_id: string, event_id: number) {
	const ticket = await db.tickets.setAccount(ticket_id, event_id, account_id);
	revalidatePath(`/dashboard/events/${ticket_id}/get-tickets`);
	return ticket;
}
