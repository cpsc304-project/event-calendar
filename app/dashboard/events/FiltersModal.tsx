import Button from "@/lib/components/Button";
import { Category } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { temporaryStorage } from "./storage";

function useSearchParamState(key: string) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const values = searchParams?.getAll(key);

	const toggleValue = useCallback(
		(value: string) => {
			const params = new URLSearchParams(searchParams ?? "");
			if (params.has(key, value)) {
				params.delete(key, value);
			} else {
				params.append(key, value);
			}
			router.replace(`${pathname}?${params.toString()}`);
		},
		[key, pathname, router, searchParams],
	);

	return [values, toggleValue] as const;
}

interface Props {
	categories: Category[];
	selectedCategories: string[];
	onClose?: () => void;
}

export default function FiltersModal(props: Props) {
	const pathname = usePathname();
	const router = useRouter();

	const [categories, setCategories] = useState<Category[]>([]);

	useLayoutEffect(() => {
		const categories = props.selectedCategories.flatMap((name) => {
			const category = props.categories.find((c) => c.category_name === name);
			return category ? [category] : [];
		});
		setCategories(categories);
	}, [props.selectedCategories, props.categories]);

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
		const params = new URLSearchParams();
		categories.forEach((category) => params.append("category", category.category_name));
		router.push(`${pathname}?${params.toString()}`);
		props.onClose?.();
	}

	function clearAll() {
		setCategories([]);
	}

	return (
		<div className="max-h-[80vh] min-w-0 max-w-3xl flex-grow rounded-xl bg-white shadow-2xl">
			<div className="relative flex justify-center border-b p-4">
				<h3 className="text-md font-bold">Filters</h3>
				<div className="absolute inset-0 flex items-center p-4">
					<Button onClick={() => props.onClose?.()}>Close</Button>
				</div>
			</div>
			<div className="p-6">
				<div className="">
					<h1 className="mb-4 text-xl font-semibold">Category</h1>
					<div className="scrollbar grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto py-2 md:grid-rows-1">
						{props.categories.map((category) => (
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
