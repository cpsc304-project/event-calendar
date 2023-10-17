import "./globals.css";
import type { Metadata } from "next";
import { AxiomWebVitals } from "next-axiom";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { PropsWithChildren } from "react";

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
				{children}
				<Analytics />
			</body>
		</html>
	);
}
