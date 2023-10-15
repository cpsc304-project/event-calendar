import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-around">
			<h1 className="text-xl font-bold">Insert Logo Here</h1>
			<div className="text-center">
				<span className="flex divide-x-2 divide-black">
					<h2 className="pr-2 font-semibold">404</h2>
					<h3 className="pl-2">Could not find requested resource</h3>
				</span>
				<Link href="/">Return Home</Link>
			</div>
		</div>
	);
}