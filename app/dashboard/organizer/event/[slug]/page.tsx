import { db } from "@/lib/db";
import ManageEvent from "./manage-event";


// TODO: This is a stub.  Need to implement this page.
export default async function Page({ params }: { params: { slug: string } }) {
	const eventInfo = await db.events.getByEventId(parseInt(params.slug));
	console.log(eventInfo);
	return (
		<>
			<ManageEvent eventInfo={eventInfo} />
			<div>My Post: {params.slug}</div>
		</>
	);
}
