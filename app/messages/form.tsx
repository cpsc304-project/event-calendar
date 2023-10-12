"use client";

import { useOptimistic } from "react";
import Add from "./add";
import List from "./list";
import { getNextId } from "@/lib/helpers";
import { Message, MessageForm } from "@/lib/schema/message";

interface Props {
	messages: Message[];
}

export default function Form({ messages }: Props) {
	const [msgs, addMsg] = useOptimistic(
		messages.map((message) => ({ ...message, optimistic: false })),
		(rest, formData: FormData) => [
			...rest,
			{
				...MessageForm.parse(formData),
				id: getNextId(rest),
				optimistic: true,
			},
		],
	);

	return (
		<>
			<Add onAdd={addMsg} />
			<List messages={msgs} />
		</>
	);
}
