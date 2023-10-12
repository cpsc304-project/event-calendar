import { type Message } from "@/lib/schema/message";

function MessageView({ message }: { message: Message & { optimistic: boolean } }) {
	return (
		<div className={`rounded p-4 ${message.optimistic ? "bg-slate-700" : "bg-slate-500"}`}>
			<h4 className="text-lg font-bold">{message.title}</h4>
			<p>{message.content}</p>
		</div>
	);
}

interface Props {
	messages: (Message & { optimistic: boolean })[];
}

export default function List({ messages }: Props) {
	return (
		<div className="mx-auto my-8 flex flex-col gap-4">
			{messages.toReversed().map((message) => (
				<MessageView key={message.id} message={message} />
			))}
		</div>
	);
}
