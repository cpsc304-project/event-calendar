import Add from "./add";
import List from "./list";

export default async function Page() {
	return (
		<div className="mx-auto my-8 max-w-lg space-y-8 px-8">
			<Add />
			<List />
		</div>
	);
}
