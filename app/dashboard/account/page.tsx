import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { db } from "@/lib/db";
import { Ticket } from "@/lib/schema";
import Link from "next/link";

export default async function Page() {
	function toHumanDate(date: Date) {
		return new Date(date).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	function generateEventTicketCard(ticket: any) {
		console.log(ticket)
		return (
			<Link href={`/dashboard/events/${ticket.event_id}`}>
			<div className="w-full h-40 overflow-hidden border-2 rounded p-3 bg-indigo-100">
				<div className="text-lg text-center">ADMIT ONE</div>
				<div className="text-xl">{ticket.name}</div>
				<div>
					{toHumanDate(ticket.start_date)} - {toHumanDate(ticket.end_date)}
				</div>
				<div>{ticket.description}</div>
			</div>
			</Link>

		);
	}

	const { getUser } = getKindeServerSession();
	const kindeUser = await getUser();

	if (!kindeUser) {
		return (
			<div className="mx-auto my-auto">
				<LoginLink className="rounded bg-indigo-500 px-5 py-3 text-white">
					Sign in to view your account
				</LoginLink>
			</div>
		);
	}

	const user = await db.accounts.getByKindeId(kindeUser.id);
	const guest = await db.accounts.getGuest(user.account_id);
	if (!guest) {
		return (
			<div>
				<h1 className="mb-2 text-4xl">Your Account</h1>
				<hr className="mb-3" />
				<p className="text-base">Buy your first ticket to view your events!</p>

				<div className="my-4">
					<Link href={"/dashboard/events"} className="rounded bg-indigo-500 px-5 py-3 text-white">
						View Events
					</Link>
				</div>
			</div>
		);
	}

	const tickets = await db.tickets.getInfoByAccountId(user.account_id);

	return (
		<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{tickets.map((ticket) => generateEventTicketCard(ticket))}
		</div>
	);
}
