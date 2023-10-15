import Link from "next/link";
import LogButton from "./log-example";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4">
			<h1 className="text-3xl font-bold">Event Calendar</h1>
			<LogButton />
			<Link href="/dashboard">Go to dashboard</Link>
			<Link href="/messages">Go to messages</Link>
		</main>
	);
}
