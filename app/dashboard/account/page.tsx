import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { db } from "@/lib/db";
import Link from "next/link";
import { TicketInfo } from "@/lib/schema";

export default async function Page() {
	function toHumanDate(date: Date) {
		return new Date(date).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	function TicketInfoCard({ ticket }: { ticket: TicketInfo }) {
		return (
			<Link href={`/dashboard/events/${ticket.event_id}`}>
				<div className="h-40 w-full overflow-hidden rounded border-2 bg-indigo-100 p-3">
					<div className="text-center text-lg">ADMIT ONE</div>
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
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{tickets.map((ticket) => (
				<TicketInfoCard key={ticket.ticket_id} ticket={ticket} />
			))}
		</div>
	);
}
