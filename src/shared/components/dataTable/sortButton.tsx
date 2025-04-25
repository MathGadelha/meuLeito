import { Button } from "@components/ui/button";
import { Column } from "@tanstack/react-table";
import { useState } from "react";
import { PiCaretCircleDown } from "react-icons/pi";

const SortButton = ({
	column,
	children,
}: {
	column: Column<any>;
	children: React.ReactNode;
}) => {
	const [isSorted, setIsSorted] = useState(0);

	function handleSort() {
		if (isSorted === 0) column.toggleSorting(true);
		if (isSorted === 1) column.toggleSorting(false);
		if (isSorted === 2) column.clearSorting();
		setIsSorted((prev) => (prev === 2 ? 0 : prev + 1));
	}

	return (
		<Button
			variant="ghost"
			className="w-full flex items-center gap-1"
			onClick={handleSort}
		>
			{children}
			<PiCaretCircleDown className="w-4 h-4" />
		</Button>
	);
};

export { SortButton };
