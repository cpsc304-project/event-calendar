import Button from "@/lib/components/Button";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4">
			<h1 className="text-3xl font-bold">Event Calendar</h1>
			<Link href="/dashboard/events">
				<Button>Go to events</Button>
			</Link>
		</main>
	);
}
