import { ColumnDef } from "@tanstack/react-table";
import { chamadosData } from "../../types/chamados.dto";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const columnsChamados: ColumnDef<chamadosData>[] = [
	{
		accessorKey: "nome",
		header: "Nome",
		cell: ({ row }) => {
			const value = row.original.nome;
			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "Status",
		header: "Status",
		cell: ({ row }) => {
			const value = row.original.status;
			return <p>{value}</p>;
		},
	},
	{
		accessorKey: "Tipo",
		header: "Tipo",
		cell: ({ row }) => {
			const value = row.original.tipo;
			return <p>{value}</p>;
		},
	},
	// {
	// 	accessorKey: "data_criacao",
	// 	header: "Data de Abertura",
	// 	cell: ({ row }) => {
	// 		const value = row.original.data_criacao;
	// 		const format = dayjs(value).format("DD/MM/YYYY HH:mm:ss");

	// 		return <p>{format}</p>;
	// 	},
	// },
	// {
	// 	accessorKey: "data_resposta",
	// 	header: "Data de aceitação",
	// 	cell: ({ row }) => {
	// 		const value = row.original.data_resposta;
	// 		const format = dayjs(value).format("DD/MM/YYYY HH:mm:ss");

	// 		return <p>{format}</p>;
	// 	},
	// },
	// {
	// 	accessorKey: "data_fim",
	// 	header: "Data de Finalização",
	// 	cell: ({ row }) => {
	// 		const value = row.original.data_fim;
	// 		const format = dayjs(value).format("DD/MM/YYYY HH:mm:ss");

	// 		return <p>{format}</p>;
	// 	},
	// },
	{
		accessorKey: "tempo_resposta",
		header: "Tempo de Resposta",
		cell: ({ row }) => {
			const inicio = row.original.data_criacao;
			const resposta = row.original.data_resposta;

			// caso ainda não tenha resposta
			if (!resposta) return <p>-</p>;

			const start = dayjs(inicio);
			const end = dayjs(resposta);

			// diferença em minutos e segundos
			const diffMs = end.diff(start);
			const duration = dayjs.duration(diffMs);

			const minutos = duration.minutes();
			const horas = duration.hours();
			const segundos = duration.seconds();

			// formato amigável
			let texto = "";

			if (horas > 0) texto += `${horas}h `;
			if (minutos > 0 || horas > 0) texto += `${minutos}min `;
			texto += `${segundos}s`;

			return <p>{texto}</p>;
		}
	},
	{
		accessorKey: "tempo_fim",
		header: "Tempo de atendimento",
		cell: ({ row }) => {
			const inicio = row.original.data_criacao;
			const fim = row.original.data_fim;

			// caso ainda não tenha resposta
			if (!fim) return <p>-</p>;

			const start = dayjs(inicio);
			const end = dayjs(fim);

			// diferença em minutos e segundos
			const diffMs = end.diff(start);
			const duration = dayjs.duration(diffMs);

			const minutos = duration.minutes();
			const horas = duration.hours();
			const segundos = duration.seconds();

			// formato amigável
			let texto = "";

			if (horas > 0) texto += `${horas}h `;
			if (minutos > 0 || horas > 0) texto += `${minutos}min `;
			texto += `${segundos}s`;

			return <p>{texto}</p>;
		}
	}
];

export { columnsChamados };
