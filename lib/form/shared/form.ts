import { Issue } from "./issues";

export type Action<T> = (state: FormState<T>, formData: FormData) => Promise<FormState<T>>;

export type FormStateIdle = { state: "idle" };
export type FormStatePending = { state: "pending" };
export type FormStateSuccess<T> = { state: "success"; result: T };
export type FormStateError = { state: "error"; error: string; path?: string | undefined };
export type FormStateInvalid = { state: "invalid"; issue: Issue };
export type FormState<T> =
	| FormStateIdle
	| FormStatePending
	| FormStateSuccess<T>
	| FormStateError
	| FormStateInvalid;
