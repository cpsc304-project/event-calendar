import { messages } from "@/lib/controller";
import Form from "./form";

export default async function Page() {
	const msgs = await messages.getAll();

	return (
		<div className="mx-auto my-8 max-w-lg space-y-8 px-8">
			<Form messages={msgs} />
		</div>
	);
}
