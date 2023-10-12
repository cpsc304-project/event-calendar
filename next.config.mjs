import { withAxiom } from "next-axiom";

/** @type {import('next').NextConfig} */
const baseConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: true,
		typedRoutes: true,
	},
};

export default withAxiom(baseConfig);
