"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function buyTicketForAccountId(
	account_id: number,
	ticket_id: string,
	event_id: number,
) {
	const guest = await db.accounts.getGuest(account_id);
	if (!guest) {
		await db.accounts.insertGuest(account_id, false);
	}

	const ticket = await db.tickets.setAccount(ticket_id, event_id, account_id);
	revalidatePath(`/dashboard/events/${ticket_id}/get-tickets`);
	redirect("/dashboard/events/[event_id]/get-tickets/success");
}
