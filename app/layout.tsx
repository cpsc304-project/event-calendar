import "./globals.css";
import type { Metadata } from "next";
import { AxiomWebVitals } from "next-axiom";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { PropsWithChildren } from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Event Calendar",
	description: "CPSC304 Project",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<AxiomWebVitals />
			<body className={montserrat.className}>
				<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
