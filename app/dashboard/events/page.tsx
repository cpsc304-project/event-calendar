import { db } from "@/lib/db";
import List from "./list";

export default async function Page() {
	const initialEvents = await db.events.getAll();
	const categories = await db.categories.getAll();

	return <List initialEvents={initialEvents} categories={categories} />;
}
