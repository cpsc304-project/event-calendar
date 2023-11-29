import { Logger } from "../../logger";
import { FormState } from "../shared";
import { ObjectEntries, ObjectOutput } from "../shared/helpers";
import { Schema } from "../shared/types";
export type { Action } from "../shared";

export class FormError extends Error {
	constructor(
		public message: string,
		public path?: string | undefined,
	) {
		super();
	}
}

export async function formAction<Result, const Entries extends ObjectEntries<string>>(
	schema: Schema<ObjectOutput<Entries, string>>,
	formData: FormData,
	action: (props: ObjectOutput<Entries, string>) => Promise<Result>,
): Promise<FormState<Result>> {
	using logger = new Logger();

	const result = schema(formData);
	if (result.state !== "success") {
		logger.warn("A validation error occured in a form server action.", { issue: result.issue });
		return {
			state: "invalid",
			issue: result.issue,
		};
	}

	try {
		return {
			state: "success",
			result: await action(result.result),
		};
	} catch (error) {
		if (error instanceof FormError) {
			return {
				state: "error",
				error: error.message,
				path: error.path,
			};
		}

		logger.error("An uncaught error occured in a form server action.", error as Error);
		return {
			state: "error",
			error: "An unknown error occurred.",
		};
	}
}
