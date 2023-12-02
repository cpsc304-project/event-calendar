import Logo from "@/lib/components/Logo";
import Button from "@/lib/components/Button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-around">
			<Logo />
			<div className="text-center">
				<span className="flex divide-x-2 divide-black">
					<h2 className="pr-2 font-semibold">404</h2>
					<h3 className="pl-2">Could not find requested resource</h3>
				</span>
				<Link href="/">
					<Button>Return home</Button>
				</Link>
			</div>
		</div>
	);
}
