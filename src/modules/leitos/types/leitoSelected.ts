type LeitoSelected = {
	label: string;
	ocupado: boolean;
	leito: string;
	leitoId: number;
	paciente?: paciente;
	chamados?: number;
};

type paciente = {
	nome: string;
	idade: string;
	sexo: string;
};

export type { LeitoSelected, paciente };
