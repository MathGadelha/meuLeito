import { z } from "zod";

const FormSchemaPessoa = z.object({
	nome: z.string().min(5, {
		message: "Nome deve pelo menos conter 5 caracteres.",
	}),
	data_nascimento: z.string().min(6, {
		message: "Deve ser preenchida uma data de nascimento.",
	}),
	cpf: z.string().min(6, {
		message: "Digite todos os dígitos do cpf.",
	}),
	email: z.string().email({
		message: "Digite um email válido.",
	}),
	sexo: z.string().min(1, {
		message: "Selecione um sexo.",
	}),
});

export { FormSchemaPessoa };

