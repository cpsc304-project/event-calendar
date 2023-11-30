import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import CreateEventPage from "./create-event";

// TODO: This is a stub.  Need to implement this page.
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

	return <CreateEventPage user={user}  organizerName={organizer?.organization_name} eventCategories={categories}/>;
}
