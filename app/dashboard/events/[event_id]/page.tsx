import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page(props: { params: { event_id: string } }) {
	const event_id = Number(props.params.event_id);
	const event = await db.events.getByEventId(event_id);
	if (!event) {
		redirect("/dashboard/events");
	}

	return <div>Hello world</div>;
}
