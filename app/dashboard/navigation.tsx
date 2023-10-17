"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const NavLink = ({
	children,
	current,
	href,
}: {
	children: React.ReactNode;
	current?: boolean;
	href: string;
}) => {
	return (
		<Link href={href}>
			<li
				className={`relative cursor-pointer px-4 py-3 after:absolute after:inset-0 after:z-40 after:block after:border-b after:transition-colors ${
					current ? "font-semibold after:border-blue-700" : "hover:after:border-gray-300"
				}`}
			>
				{children}
			</li>
		</Link>
	);
};

export default function Navigation() {
	const selected = useSelectedLayoutSegment();

	return (
		<nav>
			<ul className="flex overflow-x-auto overflow-y-hidden">
				<NavLink href="/">Home</NavLink>
				<NavLink current={selected === null} href="/dashboard">
					Dashboard
				</NavLink>
				<NavLink current={selected === "messages"} href="/dashboard/messages">
					Messages
				</NavLink>
				<NavLink current={selected === "something"} href="/dashboard/something">
					Something
				</NavLink>
			</ul>
		</nav>
	);
}
