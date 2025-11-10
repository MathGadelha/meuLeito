import { z } from "zod";

const LeitosAdminFormSchema = z.object({
	nome: z.string().min(6, {
		message: "Nome deve conter pelo menos 6 caracteres",
	}),
	setor: z.string().min(1, {
		message: "Você deve selecionar um setor",
	}),
	status: z.enum(["Disponível", "Ocupado", "Manutenção", "Livre"], {
		message: "Status inválido",
	}),
});

export { LeitosAdminFormSchema };
