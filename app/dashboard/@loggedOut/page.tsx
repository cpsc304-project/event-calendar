import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

export default function Page() {
	return (
		<div>
			<Link href="/">Go home</Link>
			<h1>Not logged in</h1>
			<SignInButton />
		</div>
	);
}
