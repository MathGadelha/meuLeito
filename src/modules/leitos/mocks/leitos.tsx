import { LeitoSelected } from "../types/leitoSelected";

const leitos: LeitoSelected[] = [
	{
		label: "201",
		ocupado: false,
		leito: "Leito 201",
		leitoId: 1,
	},
	{
		label: "202",
		ocupado: true,
		leito: "Leito 202",
		leitoId: 2,
		paciente: {
			nome: "Lucas",
			idade: "25",
			sexo: "Masculino",
		},
	},
	{
		label: "203",
		ocupado: true,
		leito: "Leito 203",
		leitoId: 3,
		paciente: {
			nome: "Junior",
			idade: "28",
			sexo: "Masculino",
		},
	},
	{
		label: "204",
		ocupado: false,
		leito: "Leito 204",
		leitoId: 4,
	},
	{
		label: "205",
		ocupado: false,
		leito: "Leito 205",
		leitoId: 5,
	},
	{
		label: "206",
		ocupado: false,
		leito: "Leito 206",
		leitoId: 6,
	},
	{
		label: "207",
		ocupado: false,
		leito: "Leito 207",
		leitoId: 7,
	},
];

export { leitos };
