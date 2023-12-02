import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Action, formAction } from "@/lib/form/server";
import { createEventSchema } from "./schema";
import { Logger } from "@/lib/logger";
import CreateEvent from "./CreateEvent";
import { Event } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export default async function Page() {
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

	const categories = await db.categories.getAll();

	const action: Action<Event> = async (state, formData) => {
		"use server";
		const organizer_id = organizer.account_id;
		return formAction(createEventSchema, formData, async (newEvent) => {
			using logger = new Logger();
			logger.debug("Creating event", { event: newEvent });
			const event = await db.events.createWithCategories({ ...newEvent, organizer_id });
			revalidateTag("all-events");
			return event;
		});
	};

	return <CreateEvent action={action} categories={categories} />;
}
