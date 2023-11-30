import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page(props: { event_id: number }) {
	const event = await db.events.getByEventId(props.event_id);
	if (!event) {
		redirect("/dashboard/events");
	}

	return <div>Hello world</div>;
}
