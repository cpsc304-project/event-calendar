import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { FormState } from "@/lib/form";
import { formAction } from "@/lib/form/server";
import { createEventSchema } from "./schema";
import { Logger } from "@/lib/logger";
import EventForm from "./eventForm";

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

	async function action(state: FormState<void>, formData: FormData) {
		"use server";
		const wrappedOrganizer = organizer;
		return formAction(createEventSchema, formData, async (newEvent) => {
			using logger = new Logger();
			logger.debug("Create event action called", { newEvent, organizer: wrappedOrganizer });
		});
	}

	return <EventForm action={action} categories={categories} />;
}
