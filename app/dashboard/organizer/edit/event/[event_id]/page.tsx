import { db } from "@/lib/db";
import { Action } from "@/lib/form";
import { FormError, formAction } from "@/lib/form/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import { createDiscountSchema, editEventSchema } from "./schema";
import EditEvent from "./EditEvent";
import { DiscountedTicket, EventWithVenueAndAreaAndCategories } from "@/lib/schema";
import { Event } from "@/lib/schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { Logger } from "next-axiom";

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
	let ticketsAvailable: number;
	try {
		event = await db.events.getWithVenueAndAreaAndCategories(Number(props.params.event_id));
		ticketsAvailable = await db.tickets.getNumberAvailable(event.event_id);
	} catch {
		notFound();
	}

	const categories = await db.categories.getAll();

	const action: Action<Event> = async (state, formData) => {
		"use server";
		const capturedEvent = event;
		return await formAction(editEventSchema, formData, async (data) => {
			const logger = new Logger();
			try {
				const updatedEvent = await db.events.update({
					event_id: capturedEvent.event_id,
					name: data.name !== capturedEvent.name ? data.name : undefined,
					description:
						data.description !== capturedEvent.description ? data.description : undefined,
					new_ticket_count: data.new_ticket_count,
					new_ticket_cost: data.new_ticket_cost,
					category_names: !arrayShallowEqual(
						data.category_names,
						capturedEvent.categories.map((c) => c.category_name),
					)
						? data.category_names
						: undefined,
				});

				revalidateTag("all-events");

				return updatedEvent;
			} finally {
				logger.flush();
			}
		});
	};

	const createDiscountsAction: Action<DiscountedTicket[]> = async (state, formData) => {
		"use server";
		const capturedEvent = event;
		const capturedNumberAvailable = ticketsAvailable;
		return await formAction(createDiscountSchema, formData, async (data) => {
			const logger = new Logger();
			try {
				if (data.amountToDiscount > capturedNumberAvailable) {
					throw new FormError(
						"You cannot discount more tickets than are available",
						"amountToDiscount",
					);
				}

				const discountedTickets = await db.tickets.setNDiscounts(
					capturedEvent.event_id,
					data.amountToDiscount,
					data.discount,
					data.promo_code,
				);
				revalidatePath(`/dashboard/events/${capturedEvent.event_id}/edit`);
				return discountedTickets;
			} finally {
				logger.flush();
			}
		});
	};

	return (
		<EditEvent
			event={event}
			categories={categories}
			action={action}
			createDiscountsAction={createDiscountsAction}
			ticketsAvailable={ticketsAvailable}
		/>
	);
}
