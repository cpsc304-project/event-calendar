import Button from "@/lib/components/Button";
import { Category } from "@/lib/schema";
import { useLayoutEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FilterProps } from "./sharedStore";
import { useFilterStore } from "./clientStore";

interface Props {
	allCategories: Category[];
	switchFilter(filters: FilterProps): Promise<void>;
	onClose?(): void;
}

export default function FiltersModal({ allCategories, switchFilter, onClose }: Props) {
	const [categories, setCategories] = useState<Category[]>([]);
	const selected = useFilterStore((state) => state.categories);

	useLayoutEffect(() => {
		const categories = selected.flatMap((name) => {
			const category = allCategories.find((c) => c.category_name === name);
			return category ? [category] : [];
		});
		setCategories(categories);
	}, [allCategories, selected]);

	function toggleCategory(category: Category) {
		setCategories((categories) => {
			if (categories.includes(category)) {
				return [...categories.filter((c) => c !== category)];
			} else {
				return [...categories, category];
			}
		});
	}

	function apply() {
		if (categories.length === 0) {
			switchFilter({ filter: "none", categories: [] });
		} else {
			switchFilter({ filter: "custom", categories: categories.map((c) => c.category_name) });
		}

		onClose?.();
	}

	function clearAll() {
		setCategories([]);
	}

	return (
		<div className="flex h-5/6 flex-col divide-y rounded-t-xl bg-white shadow-2xl md:h-auto md:w-5/6 md:rounded-b-xl">
			<div className="relative flex justify-center p-4">
				<h3 className="text-md font-bold">Filters</h3>
				<div className="absolute inset-0 flex items-center p-4">
					<Button onClick={() => onClose?.()}>Close</Button>
				</div>
			</div>
			<div className="grow overflow-y-auto p-6">
				<h1 className="mb-4 text-xl font-semibold">Category</h1>
				<div className="scrollbar grid gap-4 py-2 [grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))]">
					{allCategories.map((category) => (
						<button
							role="checkbox"
							aria-checked={categories.includes(category)}
							key={category.category_name}
							className={twMerge(
								"flex h-36 flex-shrink-0 flex-col justify-between rounded-xl border p-4 text-start hover:border-gray-800",
								"transform transition-all active:scale-95",
								"aria-checked:border-2 aria-checked:border-gray-800 aria-checked:bg-gray-50",
							)}
							onClick={() => toggleCategory(category)}
						>
							<h4 className="font-semibold">{category.category_name}</h4>
							<p>{category.description}</p>
						</button>
					))}
				</div>
			</div>
			<div className="flex justify-between p-4">
				<Button onClick={() => clearAll()}>Clear All</Button>
				<Button fill onClick={() => apply()}>
					Apply
				</Button>
			</div>
		</div>
	);
}
