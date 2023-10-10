import { withSentryConfig } from "@sentry/nextjs";
import { withAxiom } from "next-axiom";

/** @type {import('next').NextConfig} */
const baseConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: true,
		typedRoutes: true,
	},
};

const withAxiomConfig = withAxiom(baseConfig);

export default withSentryConfig(
	withAxiomConfig,
	{
		// For all available options, see:
		// https://github.com/getsentry/sentry-webpack-plugin#options

		// Suppresses source map uploading logs during build
		silent: true,
		org: "cpsc304-project",
		project: "event-calendar",
	},
	{
		// For all available options, see:
		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

		// Upload a larger set of source maps for prettier stack traces (increases build time)
		widenClientFileUpload: true,

		// Transpiles SDK to be compatible with IE11 (increases bundle size)
		transpileClientSDK: false,

		// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
		tunnelRoute: "/monitoring",

		// Hides source maps from generated client bundles
		hideSourceMaps: true,

		// Automatically tree-shake Sentry logger statements to reduce bundle size
		disableLogger: true,
	},
);
