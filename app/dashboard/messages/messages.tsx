"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import Form from "./form";
import List from "./list";
import { MessageForm, PotentialMessage } from "@/lib/schema/message";

export const getNextId = (items: { id: number }[]) => Math.max(...items.map((x) => x.id)) + 1;

const messagesReducer = (rest: PotentialMessage[], formData: FormData) => [
	{
		...MessageForm.parse(formData),
		id: getNextId(rest),
		optimistic: true,
	},
	...rest,
];

export default function Messages(props: { sentMessages: PotentialMessage[] }) {
	const [optimisticMessages, addOptimisticMessage] = useOptimistic(
		props.sentMessages,
		messagesReducer,
	);

	return (
		<div className="space-y-4">
			<Form onAddMessage={addOptimisticMessage} />
			<List messages={optimisticMessages} />
		</div>
	);
}
