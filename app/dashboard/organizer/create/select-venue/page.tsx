import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import SelectVenue from "./SelectVenue";

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

	const venues = await db.venues.getAll();
	const venueTypes = await db.venues.getTypes();

	const mapboxApiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
	if (!mapboxApiKey) {
		throw new Error("Missing NEXT_PUBLIC_MAPBOX_API_KEY in environment.");
	}

	return <SelectVenue venues={venues} venueTypes={venueTypes} mapboxApikey={mapboxApiKey} />;
}
