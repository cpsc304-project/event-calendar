"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { PropsWithChildren } from "react";

const NavLink = (props: PropsWithChildren<{ current?: boolean | undefined; href: string }>) => {
	return (
		<Link href={props.href}>
			<li
				className={`relative cursor-pointer px-4 py-3 after:absolute after:inset-0 after:z-20 after:block after:border-b after:transition-colors ${
					props.current ? "font-semibold after:border-blue-700" : "hover:after:border-gray-400"
				}`}
			>
				{props.children}
			</li>
		</Link>
	);
};

export default function Navigation() {
	const selected = useSelectedLayoutSegment();

	return (
		<nav>
			<ul role="list" className="flex overflow-x-auto overflow-y-hidden">
				<NavLink href="/">Home</NavLink>
				<NavLink current={selected === null} href="/dashboard">
					Dashboard
				</NavLink>
				<NavLink current={selected === "messages"} href="/dashboard/messages">
					Messages
				</NavLink>
				<NavLink current={selected === "photos"} href="/dashboard/photos">
					Photos
				</NavLink>
			</ul>
		</nav>
	);
}
