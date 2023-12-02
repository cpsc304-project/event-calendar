import { db } from "@/lib/db";
import { Action } from "@/lib/form";
import { FormError, formAction } from "@/lib/form/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import { editEventSchema } from "./schema";
import EditEvent from "./EditEvent";
import { EventWithVenueAndAreaAndCategories } from "@/lib/schema";
import { Event } from "@/lib/schema";

function arrayShallowEqual<T>(a: T[], b: T[]): boolean {
	if (a.length !== b.length) {
		return false;
	}

	return a.every((v, i) => v === b[i]);
}

interface Props {
	params: { event_id: string };
}

export default async function Page(props: Props) {
	const { getUser } = getKindeServerSession();
	const kindeUser = await getUser();
	if (!kindeUser) {
		redirect("/dashboard");
	}

	const user = await db.accounts.getByKindeId(kindeUser.id);
	const organizer = await db.accounts.getOrganizer(user.account_id);
	if (!organizer) {
		redirect("/dashboard");
	}

	let event: EventWithVenueAndAreaAndCategories;
	try {
		event = await db.events.getWithVenueAndAreaAndCategories(Number(props.params.event_id));
	} catch {
		notFound();
	}

	const categories = await db.categories.getAll();

	const action: Action<Event> = async (state, formData) => {
		"use server";
		const capturedEvent = event;
		return await formAction(editEventSchema, formData, async (data) => {
			if (data.ticket_count < capturedEvent.ticket_count) {
				throw new FormError("You cannot reduce the number of attendees", "attendees");
			}

			const updatedEvent = await db.events.update({
				event_id: capturedEvent.event_id,
				name: data.name !== capturedEvent.name ? data.name : undefined,
				description: data.description !== capturedEvent.description ? data.description : undefined,
				ticket_count:
					data.ticket_count !== capturedEvent.ticket_count ? data.ticket_count : undefined,
				category_names: !arrayShallowEqual(
					data.category_names,
					capturedEvent.categories.map((c) => c.category_name),
				)
					? data.category_names
					: undefined,
			});

			return updatedEvent;
		});
	};

	return <EditEvent event={event} categories={categories} action={action} />;
}
