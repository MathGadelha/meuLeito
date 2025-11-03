
// import { usuariosData } from "@modules/adminWeb/types/usuarios.dto";
// import { LeitoSelected } from "@modules/leitos/types/leitoSelected";
import { treatsText } from "@shared/utils/filter";
import { ColumnDef } from "@tanstack/react-table";
import { userData } from "../../services/listProfissionais/listProfissionais.dto";

const columnsProfissionais: ColumnDef<userData>[] = [
	{
		accessorKey: "nome",
		header: "Nome",
		cell: ({ row }) => {
			const value = row.original.Nome;
			return <p>{treatsText(value)}</p>;
		},
	},
	{
		accessorKey: "dataNascimento",
		header: "Data de Nascimento",
		cell: ({ row }) => {
			const date = new Date(row.original.Nascimento);
			const day = String(date.getDate()).padStart(2, "0");
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const year = date.getFullYear();

			const value = `${day}/${month}/${year}`;

			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "cpf",
		header: "CPF",
		cell: ({ row }) => {
			const value = row.original.CPF;
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
	{
		accessorKey: "perfil",
		header: "Perfil",
		cell: ({ row }) => {
			const value = row.original.Perfil;
			return <p>{value}</p>;
		},
	},
];

export { columnsProfissionais };
