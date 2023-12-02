import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { db } from "@/lib/db";
import { Ticket } from "@/lib/schema";
import Link from "next/link";

export default async function Page() {
	function generateEventTicketCard(ticket: any) {
		return (
			<div className="w-full border-2">
				<div>{ticket.event_name}</div>
				<div>
					{ticket.start_date} - {ticket.end_date}
				</div>
				<div>{ticket.event_description}</div>
			</div>
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
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{tickets.map((ticket) => generateEventTicketCard(ticket))}
		</div>
	);
}
