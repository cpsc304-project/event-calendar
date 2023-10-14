import Link from "next/link";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";

const CustomSignInButton = () => (
	<>
		<ClerkLoading>
			<button key="sign-in">Sign in pls</button>
		</ClerkLoading>
		<ClerkLoaded>
			<SignInButton>
				<button key="sign-in">Sign in pls</button>
			</SignInButton>
		</ClerkLoaded>
	</>
);

export default function Page() {
	return (
		<div>
			<Link href="/">Go home</Link>
			<h1>Not logged in</h1>
			<CustomSignInButton />
		</div>
	);
}
