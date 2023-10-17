"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import Form from "./form";
import List from "./list";
import { getNextId } from "@/lib/helpers";
import { Message, MessageForm } from "@/lib/schema/message";

interface Props {
	messages: Message[];
}

export default function Messages(props: Props) {
	const [messages, addOptimisticMessage] = useOptimistic(
		props.messages.map((message) => ({ ...message, optimistic: false })),
		(rest, formData: FormData) => [
			{
				...MessageForm.parse(formData),
				id: getNextId(rest),
				optimistic: true,
			},
			...rest,
		],
	);

	return (
		<div className="space-y-4">
			<Form onAddMessage={addOptimisticMessage} />
			<List messages={messages} />
		</div>
	);
}
