import { ColumnDef } from "@tanstack/react-table";
import { profissionalData } from "../../types/profissional.dto";

const columnsProfissionais: ColumnDef<profissionalData>[] = [
	{
		accessorKey: "usuario",
		header: "Nome",
		cell: ({ row }) => {
			const value = row.original.nome;
			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => {
			const value = row.original.email;
			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "Finalizados",
		header: "Finalizados",
		cell: ({ row }) => {
			const value = row.original.chamadosAtendidos;
			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "Pendentes",
		header: "Pendentes",
		cell: ({ row }) => {
			const value = row.original.chamadosPendentes;
			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "Atrasados",
		header: "Atrasados",
		cell: ({ row }) => {
			const value = row.original.chamadosAtrasados;
			return <p>{value}</p>;
		},
	},
];

export { columnsProfissionais };
