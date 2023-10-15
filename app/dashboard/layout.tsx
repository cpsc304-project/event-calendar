export const runtime = "edge";

interface Props {
	children: React.ReactNode;
	toolbar: React.ReactNode;
}

export default function Layout({ children, toolbar }: Props) {
	return (
		<>
			{toolbar}
			<main className="mx-auto max-w-3xl p-4">{children}</main>
		</>
	);
}
