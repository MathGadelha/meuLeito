import { z } from "zod";

const LeitosAdminFormSchema = z.object({
	nome: z.string().min(6, {
		message: "Nome deve conter pelo menos 6 caracteres",
	}),
	setor: z.string().min(6, {
		message: "Setor deve conter pelo menos 6 caracteres",
	}),
	status: z.enum(["Disponível", "Ocupado", "Manutenção"], {
		message: "Status inválido",
	}),
});

export { LeitosAdminFormSchema };
