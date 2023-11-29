import type { Issue } from "./issues";

export type ParseSuccess<Output> = {
	state: "success";
	result: Output;
};

export type ParseFail = {
	state: "fail";
	issue: Issue;
};

export type ParseUnrecoverable = {
	state: "unrecoverable";
	issue: Issue;
};

export type ParseResult<Output> = ParseSuccess<Output> | ParseFail | ParseUnrecoverable;

export const newParseSuccess = <Output>(result: Output): ParseSuccess<Output> => ({
	state: "success",
	result,
});

export const newParseFail = (issue: Issue): ParseFail => ({
	state: "fail",
	issue,
});

export const newParseUnrecoverable = (issue: Issue): ParseUnrecoverable => ({
	state: "unrecoverable",
	issue,
});
