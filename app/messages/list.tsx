import sql from "@/lib/db";

interface Message {
	id: number;
	title: string;
	content: string;
}

async function getAllMessages(): Promise<Message[]> {
	const messages = await sql<Message[]>`
		SELECT
			id,
			title,
			content
		FROM messages
	`;

	return messages;
}

function Message({ message }: { message: Message }) {
	return (
		<div className="rounded bg-slate-500 p-4">
			<h4 className="text-lg font-bold">{message.title}</h4>
			<p>{message.content}</p>
		</div>
	);
}

export default async function List() {
	const messages = await getAllMessages();

	return (
		<div className="mx-auto my-8 flex flex-col gap-4">
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
}
