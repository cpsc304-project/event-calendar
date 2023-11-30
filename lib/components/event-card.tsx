import { EventGetByOrganizerId } from "@/lib/schema";
import Link from "next/link";

export function EventCard(props: { event?: EventGetByOrganizerId; createLink?: string }) {
	return (
		<>
			{props.createLink ? (
				<EventCardCreate createLink={props.createLink} />
			) : (
				<Link href={`/dashboard/organizer/event/${props.event!.event_id}`}>
					<div className="h-full w-full rounded-md border bg-indigo-200 p-4 lg:p-5">
						<h4 className="font-bold">{props.event!.event_name}</h4>
						<p>{props.event!.event_description}</p>
					</div>
				</Link>
			)}
		</>
	);
}

function EventCardCreate(props: { createLink: string }) {
	return (
		<Link href={props.createLink}>
			<div className="h-full w-full rounded-md border bg-indigo-50 p-4 lg:p-5 flex content-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-6 w-6 mx-auto my-auto" 
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
			</div>
		</Link>
	);
}
