import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import EventDetails from "./eventDetails";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";


export default async function Page(props: { params: { event_id: string } }) {
	const event_id = Number(props.params.event_id);
	const event = await db.events.getByEventId(event_id);
	if (!event) {
		redirect("/dashboard/events");
	}

	const user = await.db.accounts.getByKindeId(kindeUser.id);


	return <EventDetails user={user} organizerName={event.organizer_name} events={[event]} />;
}
