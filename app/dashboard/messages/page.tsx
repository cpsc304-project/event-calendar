import { db } from "@/lib/db";
import Messages from "./messages";

export default async function Page() {
	const messages = await db.messages.getAll();

	return <Messages messages={messages} />;
}
