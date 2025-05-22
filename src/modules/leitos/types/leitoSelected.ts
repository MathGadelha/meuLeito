type LeitoSelected = {
	label: string;
	ocupado: boolean;
	leito: string;
	leitoId: number;
	paciente?: paciente;
};

type paciente = {
	nome: string;
	idade: string;
	sexo: string;
};

export type { LeitoSelected, paciente };
