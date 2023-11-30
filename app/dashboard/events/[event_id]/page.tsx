import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page(props:{params: { event_id: string }}) {
	const event = await db.events.getByEventId(parseInt(props.params.event_id));
	if (!event) {
		redirect("/dashboard/events");
	}

	return <div>Hello world</div>;
}
