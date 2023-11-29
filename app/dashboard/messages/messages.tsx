"use client";

import { useOptimistic } from "react";
import Form from "./form";
import List from "./list";
import { MessageForm, PotentialMessage } from "@/lib/schema";

export const getNextId = (items: { message_id: number }[]) =>
	Math.max(...items.map((x) => x.message_id)) + 1;

const messagesReducer = (rest: PotentialMessage[], formData: FormData) => [
	{
		...MessageForm.parse(formData),
		message_id: getNextId(rest),
		optimistic: true,
	},
	...rest,
];

export default function Messages(props: { sentMessages: PotentialMessage[] }) {
	const [messages, addMessage] = useOptimistic(props.sentMessages, messagesReducer);

	return (
		<div className="space-y-4">
			<Form onSubmit={addMessage} />
			<List messages={messages} />
		</div>
	);
}
