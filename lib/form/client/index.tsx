import { ComponentPropsWithoutRef, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { ObjectEntries, ObjectOutput } from "../shared/helpers";
import { Schema } from "../shared/types";
import { useFormState } from "react-dom";
import { isObjectIssue, issueDescription } from "../shared/issues";
import { useLogger } from "next-axiom";
import { FormState } from "../shared";
import { Action } from "../shared";

interface FormProps extends Omit<ComponentPropsWithoutRef<"form">, "action"> {}

export const getFormComponent = (
	ref: RefObject<HTMLFormElement>,
	action: (formData: FormData) => void,
) => {
	function Form({ children, ...props }: FormProps) {
		return (
			<form {...props} ref={ref} action={action}>
				{children}
			</form>
		);
	}

	return Form;
};

interface InputProps {
	name: string;
	id: string;
}

export interface InputArgs {
	props: InputProps;
	submitting: boolean;
	error?: string | undefined;
	invalid?: string | undefined;
}

interface FieldProps<Keys extends string> {
	for: Keys;
	children: (args: InputArgs) => ReactNode;
}

function getFieldComponent<Keys extends string>(state: FormState<unknown>) {
	function Field(props: FieldProps<Keys>) {
		const inputProps: InputProps = {
			name: props.for,
			id: props.for,
		};

		if (state.state === "error" && state.path === props.for) {
			return props.children({ props: inputProps, error: state.error, submitting: false });
		}

		if (
			state.state === "invalid" &&
			isObjectIssue(state.issue) &&
			props.for in state.issue.entries
		) {
			return props.children({
				props: inputProps,
				invalid: issueDescription(state.issue.entries[props.for]),
				submitting: false,
			});
		}

		return props.children({ props: inputProps, submitting: state.state === "pending" });
	}

	return Field;
}

type UseFormHook<Entries extends ObjectEntries<string>, Result> = {
	Form: ReturnType<typeof getFormComponent>;
	Field: ReturnType<typeof getFieldComponent<Extract<keyof Entries, string>>>;
	submitting: boolean;
	error: string | undefined;
	invalid: string | undefined;
	result: Result | undefined;
};

export const useForm = <Entries extends ObjectEntries<string>, Result>(
	schema: Schema<ObjectOutput<Entries, string>>,
	serverAction: Action<Result>,
): UseFormHook<Entries, Result> => {
	const ref = useRef<HTMLFormElement>(null);
	const [serverState, dispatch] = useFormState(serverAction, { state: "idle" });
	const [state, setState] = useState(serverState);
	const logger = useLogger();

	useEffect(() => setState(serverState), [serverState]);

	function clientAction(formData: FormData) {
		const result = schema(formData);
		if (result.state !== "success") {
			logger.warn("Form invalid", { issue: result.issue });
			return setState({ state: "invalid", issue: result.issue });
		}
		logger.debug("Form submitted", { values: result.result });
		setState({ state: "pending" });
		dispatch(formData);
	}

	return {
		Form: getFormComponent(ref, clientAction),
		Field: getFieldComponent(state),
		submitting: state.state === "pending",
		error: state.state === "error" ? state.error : undefined,
		invalid: state.state === "invalid" ? issueDescription(state.issue) : undefined,
		result: state.state === "success" ? state.result : undefined,
	};
};
