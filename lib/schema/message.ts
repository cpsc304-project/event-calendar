import { zfd } from "zod-form-data";

export interface Message {
	id: number;
	title: string;
	content: string;
}

export interface PotentialMessage extends Message {
	optimistic: boolean;
}

export const MessageForm = zfd.formData({
	title: zfd.text(),
	content: zfd.text(),
});
