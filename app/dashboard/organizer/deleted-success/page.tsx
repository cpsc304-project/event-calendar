import Link from "next/link";

export default function Page() {
	"use client";
	return (
		<div className="flex flex-col">
			<p className="text-2xl font-semibold">Event Deleted</p>
			<Link href={"/dashboard/organizer"}>
				<button className="mt-4 rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-700">
					Back to Dashboard
				</button>
			</Link>
		</div>
	);
}
