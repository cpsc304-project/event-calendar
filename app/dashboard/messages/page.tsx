import { db } from "@/lib/db";
import Messages from "./messages";

export default async function Page() {
	const messages = await db.messages.getAll();
	const sentMessages = messages.map((message) => ({ ...message, optimistic: false }));

	return <Messages sentMessages={sentMessages} />;
}
