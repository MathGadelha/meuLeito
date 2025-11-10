import { setor } from "@modules/adminWeb/submodules/setores/services/getSetores/getSetores.dto";
import { ColumnDef } from "@tanstack/react-table";

const columnsAlergias: ColumnDef<setor>[] = [
	{
		accessorKey: "leito",
		header: "Leito",
		cell: ({ row }) => {
			const value = row.original.Nome;
			return <p>{value}</p>;
		},
	},
];

export { columnsAlergias };
