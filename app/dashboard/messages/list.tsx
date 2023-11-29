import { PotentialMessage } from "@/lib/schema";

function MessageCard({ message }: { message: PotentialMessage }) {
	return (
		<div
			className={`rounded-md border p-4 transition-colors ${message.optimistic && "bg-blue-50"}`}
		>
			<h4 className="font-bold">{message.title}</h4>
			<p>{message.content}</p>
		</div>
	);
}

export default function List(props: { messages: PotentialMessage[] }) {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{props.messages.map((message) => (
				<MessageCard key={message.message_id} message={message} />
			))}
		</div>
	);
}
