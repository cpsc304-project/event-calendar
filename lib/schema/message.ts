import { zfd } from "zod-form-data";

export type Message = {
	id: number;
	title: string;
	content: string;
};

export const MessageForm = zfd.formData({
	title: zfd.text(),
	content: zfd.text(),
});
