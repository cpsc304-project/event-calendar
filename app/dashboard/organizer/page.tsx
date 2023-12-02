import { db } from "@/lib/db";
import Organizer from "./organizer";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function page() {
	const { getUser } = getKindeServerSession();
	const kindeUser = await getUser();
	if (!kindeUser) {
		redirect("/dashboard");
	}
	const user = await db.accounts.getByKindeId(kindeUser.id);
	const organizer = await db.accounts.getOrganizer(user.account_id);
	const events = await db.events.getByOrganizerId(user.account_id);

	return <Organizer user={user} organizerName={organizer?.organization_name} events={events} />;
}
