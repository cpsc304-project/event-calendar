import LogButton from "./log-example";

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4">
			<h1 className="text-3xl font-bold">Event Planner</h1>
			<LogButton />
		</main>
	);
}
