import { ReactNode } from "react";

interface Props {
	list: ReactNode;
	modal: ReactNode;
}

export default function Layout(props: Props) {
	return (
		<>
			{props.list}
			{props.modal}
		</>
	);
}
