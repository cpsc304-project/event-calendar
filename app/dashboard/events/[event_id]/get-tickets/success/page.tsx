import Link from "next/link";

export default function Page() {
	return (
		<div>
			<h2 className="text-4xl">Congrats on your recent ticket purchase</h2>
			<div className="text-base">Check out your account to view your purchases tickets</div>
			<Link className="text-indigo-500 underline" href={"/dashboard/account"}>Your account
			</Link>
		</div>
	);
}
