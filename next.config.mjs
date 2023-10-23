import { withAxiom } from "next-axiom";

export default async function Config(phase, { defaultConfig }) {
	/** @type {import('next').NextConfig} */
	const baseConfig = {
		reactStrictMode: true,
		images: {
			remotePatterns: [
				{
					protocol: "https",
					hostname: "utfs.io",
					port: "",
				},
				{
					protocol: "https",
					hostname: "uploadthing.com",
					port: "",
				},
			],
		},
		experimental: {
			serverActions: true,
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
