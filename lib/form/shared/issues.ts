type NonEmptyArray<T> = readonly [T, ...T[]];

export type StringIssue = string;

export type ArrayIssue = {
	description: string;
	children: NonEmptyArray<Issue>;
};

export type ObjectIssue = {
	description: string;
	entries: Record<string, Issue>;
};

export type CustomIssue = {
	formatIssue(): string;
};

export type Issue = StringIssue | ArrayIssue | ObjectIssue | CustomIssue;

function indent(str: string, prefix: string = ""): string {
	return str
		.split("\n")
		.map((line, i) => `\t${i === 0 ? prefix : ""}${line}`)
		.join("\n");
}

function formatStringIssue(issue: StringIssue): string {
	return issue;
}

function formatArrayIssue(issue: ArrayIssue): string {
	let str = issue.description;

	for (const child of issue.children) {
		str += `\n${indent(formatIssue(child), "- ")}`;
	}

	return str;
}

function formatObjectIssue(issue: ObjectIssue): string {
	let str = issue.description;

	for (const [key, value] of Object.entries(issue.entries)) {
		str += `\n${indent(formatIssue(value), `${key}: `)}`;
	}

	return str;
}

function formatCustomIssue(issue: CustomIssue): string {
	return issue.formatIssue();
}

export const isStringIssue = (issue: Issue): issue is StringIssue => typeof issue === "string";
export const isArrayIssue = (issue: Issue): issue is ArrayIssue =>
	typeof issue === "object" && "children" in issue;
export const isObjectIssue = (issue: Issue): issue is ObjectIssue =>
	typeof issue === "object" && "entries" in issue;
export const isCustomIssue = (issue: Issue): issue is CustomIssue =>
	typeof issue === "object" && "formatIssue" in issue;

export function formatIssue(issue: Issue): string {
	if (isStringIssue(issue)) {
		return formatStringIssue(issue);
	} else if (isArrayIssue(issue)) {
		return formatArrayIssue(issue);
	} else if (isObjectIssue(issue)) {
		return formatObjectIssue(issue);
	} else if (isCustomIssue(issue)) {
		return formatCustomIssue(issue);
	} else {
		throw new Error("Invalid issue.");
	}
}

export function issueDescription(issue: Issue): string {
	if (isStringIssue(issue)) {
		return issue;
	} else if (isArrayIssue(issue)) {
		return issue.description;
	} else if (isObjectIssue(issue)) {
		return issue.description;
	} else if (isCustomIssue(issue)) {
		return issue.formatIssue().split("\n")[0] ?? "Unknown issue.";
	} else {
		throw new Error("Invalid issue.");
	}
}
