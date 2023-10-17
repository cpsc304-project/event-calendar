import { ComponentProps } from "react";

const GridItem = ({ children, className, ...props }: ComponentProps<"div">) => (
	<div className={`overflow-hidden rounded-md border ${className}`} {...props}>
		{children}
	</div>
);

export default function Page() {
	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
			{[...Array(9)].map((_, i) => (
				<GridItem key={`grid-item-${i}`}>
					<h2 className="border-b bg-gray-50 p-4">Post Name</h2>
					<div className="p-4">
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, soluta a, fugit
							accusamus nihil enim qui doloremque nobis illo, numquam excepturi ullam debitis quidem
							accusantium omnis commodi dolor optio itaque?
						</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, soluta a, fugit
							accusamus nihil.
						</p>
					</div>
				</GridItem>
			))}
		</div>
	);
}
