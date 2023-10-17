import Form from "./form";

function PlaceholderMessage() {
	return (
		<div className="animate-pulse rounded-md border p-4">
			<h4 className="relative after:absolute after:inset-1 after:block after:w-32 after:rounded after:bg-gray-100">
				&nbsp;-
			</h4>
			<h5 className="relative after:absolute after:inset-1 after:block after:w-8 after:rounded after:bg-gray-100">
				&nbsp;-
			</h5>
			<p className="relative after:absolute after:inset-1 after:block after:w-64 after:rounded after:bg-gray-100">
				&nbsp;-
			</p>
		</div>
	);
}

function PlaceholderList() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
			{[...Array(20)].map((_, i) => (
				<PlaceholderMessage key={i} />
			))}
		</div>
	);
}

export default function Loading() {
	return (
		<div className="space-y-4">
			<Form disabled />
			<PlaceholderList />
		</div>
	);
}
