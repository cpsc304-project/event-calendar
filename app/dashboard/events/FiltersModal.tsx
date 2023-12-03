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
		<div className="max-h-[80vh] min-w-0 max-w-3xl flex-grow rounded-xl bg-white shadow-2xl">
			<div className="relative flex justify-center border-b p-4">
				<h3 className="text-md font-bold">Filters</h3>
				<div className="absolute inset-0 flex items-center p-4">
					<Button onClick={() => onClose?.()}>Close</Button>
				</div>
			</div>
			<div className="p-6">
				<div className="">
					<h1 className="mb-4 text-xl font-semibold">Category</h1>
					<div className="scrollbar grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto py-2 md:grid-rows-1">
						{allCategories.map((category) => (
							<button
								role="checkbox"
								aria-checked={categories.includes(category)}
								key={category.category_name}
								className={twMerge(
									"flex h-36 w-48 flex-shrink-0 flex-col justify-between rounded-xl border p-4 text-start hover:border-gray-800",
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
			</div>
			<div className="flex justify-between border-t p-4">
				<Button onClick={() => clearAll()}>Clear All</Button>
				<Button fill onClick={() => apply()}>
					Apply
				</Button>
			</div>
		</div>
	);
}
