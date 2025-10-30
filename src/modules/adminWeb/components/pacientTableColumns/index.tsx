
// import { usuariosData } from "@modules/adminWeb/types/usuarios.dto";
// import { LeitoSelected } from "@modules/leitos/types/leitoSelected";
import { userData } from "@modules/adminWeb/services/listPacientes/listPacientes.dto";
import { ColumnDef } from "@tanstack/react-table";

const columnsPacientes: ColumnDef<userData>[] = [
	{
		accessorKey: "nome",
		header: "Nome",
		cell: ({ row }) => {
			const value = row.original.Nome;
			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "dataNascimento",
		header: "Data de Nascimento",
		cell: ({ row }) => {
			const value =
				new Date(row.original.Nascimento).getDate() +
				"/" +
				(new Date(row.original.Nascimento).getMonth() + 1) +
				"/" +
				new Date(row.original.Nascimento).getFullYear();

			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "cpf",
		header: "CPF",
		cell: ({ row }) => {
			const value = row.original.Cpf;
			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "sexo",
		header: "Sexo",
		cell: ({ row }) => {
			const value = row.original.Sexo === "M" ? "Masculino" : "Feminino";
			return <p>{value}</p>;
		},
	},
];

export { columnsPacientes };
