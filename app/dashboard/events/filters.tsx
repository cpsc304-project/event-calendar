import Button from "@/lib/components/Button";
import { Category } from "@/lib/schema";

export default function Filters(props: { categories: Category[] }) {
	return (
		<div className="max-h-[80vh] max-w-3xl flex-grow rounded-xl bg-white shadow-2xl">
			<div className="relative flex justify-center border-b p-4">
				<h3 className="text-md font-bold">Filters</h3>
				<div className="absolute inset-0 flex items-center p-4">
					<Button>Close</Button>
				</div>
			</div>
			<div className="p-6">
				<div className="">
					<h1 className="mb-4 text-xl font-semibold">Category</h1>
					<div className="flex gap-4 overflow-x-auto">
						{props.categories.map((category) => (
							<div
								key={category.category_name}
								className="flex h-36 w-48 flex-shrink-0 flex-col justify-between rounded-xl border p-4 hover:border-gray-900"
							>
								<h4 className="font-semibold">{category.category_name}</h4>
								<p>{category.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="flex justify-between border-t p-4">
				<Button>Clear</Button>
				<Button>Apply</Button>
			</div>
		</div>
	);
}
