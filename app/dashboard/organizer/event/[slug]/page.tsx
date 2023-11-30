import { db } from "@/lib/db";
import AdminPanel from "./admin-panel";


// TODO: This is a stub.  Need to implement this page.
export default async function Page({ params }: { params: { slug: string } }) {
	const eventInfo = await db.events.getByEventId(parseInt(params.slug));
	console.log(eventInfo);
	return (
		<>
			<AdminPanel eventInfo={eventInfo} />
			<div>My Post: {params.slug}</div>
		</>
	);
}
