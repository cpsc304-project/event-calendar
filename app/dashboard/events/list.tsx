"use client";

import type { Category, Event } from "@/lib/schema";
import { useState, useLayoutEffect } from "react";
import Link from "next/link";
import Button from "@/lib/components/Button";
import {
	AdjustmentsHorizontalIcon,
	BanknotesIcon,
	GlobeAltIcon,
	StarIcon,
	TagIcon,
} from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import { useEvents, useFilterStore } from "./clientStore";
import { FilterProps } from "./sharedStore";
import { usePathname, useRouter } from "next/navigation";
import { Prefetch } from "./prefetch";
import FiltersModal from "./FiltersModal";

function EventCard({ event }: { event: Event }) {
	return (
		<Link href={`/dashboard/events/${event.event_id}`} className="h-96 w-80">
			<div className="h-full rounded-md border">
				<div className="aspect-[4/3] bg-gray-300"></div>
				<div className="p-4">
					<h2 className="h-8 overflow-hidden text-base font-semibold">{event.name}</h2>
					<p className="h-20 overflow-hidden text-sm">{event.description}</p>
				</div>
			</div>
		</Link>
	);
}

interface Props {
	prefetch: Prefetch;
	allCategories: Category[];
}

export default function List({ prefetch, allCategories }: Props) {
	const filter = useFilterStore((state) => state.filter);
	const setFilters = useFilterStore((state) => state.setFilters);
	const events = useEvents((state) => state.events);
	const moreEvents = useEvents((state) => state.more);
	const applyPrefetch = useEvents((state) => state.applyPrefetch);
	const getEventsFor = useEvents((state) => state.getEventsFor);
	const getMoreEvents = useEvents((state) => state.getMoreEvents);
	const router = useRouter();
	const pathname = usePathname();

	const [showFilters, setShowFilters] = useState(false);

	useLayoutEffect(() => {
		applyPrefetch(prefetch);
		setFilters(prefetch.filters);
	}, [applyPrefetch, prefetch, setFilters]);

	function status() {
		switch (true) {
			case moreEvents:
				return <Button onClick={getMoreEvents}>Load more events</Button>;
			default:
				return <p>That{"'"}s all folks!</p>;
		}
	}

	function updateURL(filters: FilterProps) {
		const params = new URLSearchParams();
		params.append("filter", filters.filter);
		filters.categories.forEach((c) => params.append("categories", c));
		router.replace(`${pathname}?${params.toString()}`);
	}

	async function switchFilter(filters: FilterProps) {
		await getEventsFor(filters);
		setFilters(filters);
		updateURL(filters);
	}

	function getAllEvents() {
		if (filter === "none") return;
		switchFilter({ filter: "none", categories: [] });
	}

	function getGreatDeals() {
		if (filter === "deals") return;
		switchFilter({ filter: "deals", categories: [] });
	}

	function getPopularEvents() {
		if (filter === "popular") return;
		switchFilter({ filter: "popular", categories: [] });
	}

	return (
		<>
			<div className="space-y-8">
				<span className="flex items-center justify-between">
					<span className="grid auto-cols-fr grid-flow-col justify-items-center gap-2">
						<Button
							className={twMerge(
								"flex-col rounded-none border-0 border-b-2 border-transparent px-0 pb-3 text-gray-500 transition-colors",
								"hover:border-gray-300 hover:bg-transparent hover:text-black aria-selected:border-gray-800 aria-selected:text-black",
							)}
							aria-selected={filter === "none"}
							onClick={() => getAllEvents()}
						>
							<GlobeAltIcon className="h-5 w-5" />
							<p className="text-xs font-medium">Everything</p>
						</Button>
						<Button
							className={twMerge(
								"flex-col rounded-none border-0 border-b-2 border-transparent px-0 pb-3 text-gray-500 transition-colors",
								"hover:border-gray-300 hover:bg-transparent hover:text-black aria-selected:border-gray-800 aria-selected:text-black",
							)}
							aria-selected={filter === "deals"}
							onClick={() => getGreatDeals()}
						>
							<BanknotesIcon className="h-5 w-5" />
							<p className="text-xs font-medium">Deals</p>
						</Button>
						<Button
							className={twMerge(
								"flex-col rounded-none border-0 border-b-2 border-transparent px-0 pb-3 text-gray-500 transition-colors",
								"hover:border-gray-300 hover:bg-transparent hover:text-black aria-selected:border-gray-800 aria-selected:text-black",
							)}
							aria-selected={filter === "popular"}
							onClick={() => getPopularEvents()}
						>
							<StarIcon className="h-5 w-5" />
							<p className="text-xs font-medium">Popular</p>
						</Button>
						<Button
							className={twMerge(
								"flex-col rounded-none border-0 border-b-2 border-transparent px-0 pb-3 text-gray-500 transition-colors",
								"hover:border-gray-300 hover:bg-transparent hover:text-black aria-selected:border-gray-800 aria-selected:text-black",
							)}
							aria-selected={filter === "custom"}
							onClick={() => setShowFilters(true)}
						>
							<TagIcon className="h-5 w-5" />
							<p className="text-xs font-medium">Custom</p>
						</Button>
					</span>
					<Button onClick={() => setShowFilters(true)} className="p-3">
						<AdjustmentsHorizontalIcon className="h-5 w-5" />
						<p className="text-xs font-medium">Filters</p>
					</Button>
				</span>
				<div className="grid justify-center gap-4 [grid-template-columns:repeat(auto-fit,20rem)]">
					{events.map((event) => (
						<EventCard key={event.event_id} event={event} />
					))}
				</div>
				<div className="flex flex-col items-center">{status()}</div>
			</div>
			{showFilters && (
				<div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 p-8 backdrop-blur-[2px]">
					<FiltersModal
						allCategories={allCategories}
						switchFilter={switchFilter}
						onClose={() => setShowFilters(false)}
					/>
				</div>
			)}
		</>
	);
}
