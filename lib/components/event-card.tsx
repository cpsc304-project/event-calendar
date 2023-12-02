import { Event, EventGetByOrganizerId } from "@/lib/schema";
import Link from "next/link";

export function EventCard(props: { event?: Event; createLink?: string }) {
	return (
		<>
			{props.createLink ? (
				<EventCardCreate createLink={props.createLink} />
			) : props.event ? (
				<Link href={`/dashboard/organizer/edit/event/${props.event.event_id}`}>
					<div className="h-full w-full rounded-md border bg-indigo-200 p-4 lg:p-5">
						<h4 className="font-bold">{props.event.name}</h4>
						<p>{props.event.description}</p>
					</div>
				</Link>
			) : null}
		</>
	);
}

function EventCardCreate(props: { createLink: string }) {
	return (
		<Link href={props.createLink}>
			<div className="flex h-full w-full content-center rounded-md border bg-indigo-50 p-4 lg:p-5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="mx-auto my-auto h-6 w-6"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</div>
		</Link>
	);
}
