import { ColumnDef } from "@tanstack/react-table";
import { setor } from "../../services/getSetores/getSetores.dto";

const columnsSetores: ColumnDef<setor>[] = [
	{
		accessorKey: "leito",
		header: "Leito",
		cell: ({ row }) => {
			const value = row.original.Nome;
			return <p>{value}</p>;
		},
	},
];

export { columnsSetores };
