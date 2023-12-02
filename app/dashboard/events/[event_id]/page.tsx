import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { EventDetails } from "./eventDetails";
import { EventGetByEventId, Review } from "@/lib/schema";
import { Action } from "@/lib/form";
import { FormError, formAction } from "@/lib/form/server";
import { createReviewSchema } from "./schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";


export default async function Page(props: { params: { event_id: string } }) {
	const { getUser } = getKindeServerSession();
	const kindeUser = await getUser();


	const event_id = Number(props.params.event_id);
	let event: EventGetByEventId;
	try {
		event = await db.events.getByEventId(event_id);
		if (!event) {
			notFound();
		}
	} catch (error) {
		notFound();
	}

	const reviews = await db.reviews.getAllByEventId(event_id);
	const categories = await db.categories.getCategoriesByEventId(event_id);

	const createReview: Action<Review> = async (state, formData) => {
		"use server";
		const event_id = parseInt(props.params.event_id);
		const kindeId = kindeUser?.id;


		return formAction(createReviewSchema, formData, async (data) => {
			if(!kindeId){
				throw new FormError("You must be logged in to leave a review");
			}
			const user = await db.accounts.getByKindeId(kindeId);

			const { reviewText, rating } = data;

			const hasTicket = await db.tickets.getByAccountAndEventId(user.account_id, event_id);
			console.log("TICKET AA", hasTicket)
			if(hasTicket.length === 0){
				throw new FormError("You must have a ticket to leave a review");
			}

			const review = await db.reviews.create(
				rating,
				reviewText,
				user.account_id,
				event_id
			);
			revalidatePath(`/dashboard/events/${event_id}`);
			return review;
		});
	};

	return <EventDetails event={event} reviews={reviews} categories={categories} action={createReview} />;
}
