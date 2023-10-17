import { type Message } from "@/lib/schema/message";

function MessageCard({ message }: { message: Message & { optimistic: boolean } }) {
	return (
		<div
			className={`rounded-md border p-4 transition-colors ${
				message.optimistic ? "bg-blue-50" : ""
			}`}
		>
			<h4 className="font-bold">{message.title}</h4>
			<h5>{message.id}</h5>
			<p>{message.content}</p>
		</div>
	);
}

interface Props {
	messages: (Message & { optimistic: boolean })[];
}

export default function List({ messages }: Props) {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
			{messages.map((message) => (
				<MessageCard key={message.id} message={message} />
			))}
		</div>
	);
}
