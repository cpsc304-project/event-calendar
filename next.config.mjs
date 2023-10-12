import { withAxiom } from "next-axiom";

export default async function Config(phase, { defaultConfig }) {
	/** @type {import('next').NextConfig} */
	const baseConfig = {
		reactStrictMode: true,
		experimental: {
			serverActions: true,
			typedRoutes: true,
		},
	};

	const configWithAxiom = withAxiom(baseConfig);

	if (process.env.ANALYZE === "true") {
		const { default: withBundleAnalyzer } = await import("@next/bundle-analyzer");
		return withBundleAnalyzer()(configWithAxiom);
	} else {
		return configWithAxiom;
	}
}
