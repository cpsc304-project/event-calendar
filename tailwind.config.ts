import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";
import { withUt } from "uploadthing/tw";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./lib/components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	plugins: [containerQueries],
};

export default withUt(config);
