import { ExclamationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
	error: string | undefined;
	invalid: string | undefined;
}

export default function Status({ error, invalid }: Props) {
	return (
		<>
			{error && (
				<span className="flex items-center gap-2 text-red-500">
					<ExclamationCircleIcon className="h-5 w-5" />
					<p>{ error }</p>
				</span>
			)}
			{invalid && (
				<span className="flex items-center gap-2">
					<ExclamationTriangleIcon className="h-5 w-5" />
					<p>{invalid}</p>
				</span>
			)}
		</>
	);
}
