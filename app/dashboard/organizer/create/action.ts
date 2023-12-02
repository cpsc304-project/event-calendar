"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createEvent(params: CreateEventInput) {
	const addedEvent = await db.events.add({
		name: params.name,
		description: params.description,
		start_date: new Date(params.start_date),
		end_date: new Date(params.end_date),
		venue_id: params.venue_id,
		organizer_id: params.organizer_id,
	});

	const selectedCategory = await db.categories.insertEventInCategory(
		addedEvent.event_id,
		params.category_name,
	);
	const createdTickets = await db.tickets.insertNTickets(
		params.number_of_tickets,
		params.ticket_cost,
		addedEvent.event_id,
	);
	revalidatePath("/dashboard/organizer");
	console.log("Tickets", createdTickets);
	console.log("Selected Category", selectedCategory);
	console.log("Added Event", addedEvent);
	return addedEvent;
}


interface CreateEventInput {
	name: string;
	description: string;
	start_date: string;
	end_date: string;
	venue_id: number;
	organizer_id: number;
	category_name: string;
	number_of_tickets: number;
	ticket_cost: number;
}
