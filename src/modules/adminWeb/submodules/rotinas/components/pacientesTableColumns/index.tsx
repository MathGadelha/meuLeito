import { ColumnDef } from "@tanstack/react-table";
import { pacientesData } from "../../types/pacientes";

const columnsPacientes: ColumnDef<pacientesData>[] = [
	{
		accessorKey: "usuario",
		header: "Nome",
		cell: ({ row }) => {
			const value = row.original.nome;
			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "leito",
		header: "Leito",
		cell: ({ row }) => {
			const value = row.original.leito;
			return <p>{value}</p>;
		},
	},
];

export { columnsPacientes };
