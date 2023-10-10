import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";

export default function UserProfilePage() {
	return (
		<>
			<Link href="/">Go home</Link>
			<UserProfile path="/profile" routing="path" />
		</>
	);
}
