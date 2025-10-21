import { userData } from "@modules/adminWeb/services/getPessoas/listPessoas.dto";
import { usuariosData } from "@modules/adminWeb/types/usuarios.dto";
// import { LeitoSelected } from "@modules/leitos/types/leitoSelected";
import { ColumnDef } from "@tanstack/react-table";

const columnsPacientes: ColumnDef<userData>[] = [
	{
		accessorKey: "dataNascimento",
		header: "Data de Nascimento",
		cell: ({ row }) => {
			const value =
				new Date(row.original.dataNascimento).getDate() +
				"/" +
				(new Date(row.original.dataNascimento).getMonth() + 1) +
				"/" +
				new Date(row.original.dataNascimento).getFullYear();

			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "cpf",
		header: "CPF",
		cell: ({ row }) => {
			const value = row.original.cpf;
			return <p>{value}</p>;
		},
	},
];

export { columnsPacientes };
