import { z } from "zod";

const AlergiaFormSchema = z.object({
	nome: z.string().min(3, {
		message: "Nome deve conter pelo menos 6 caracteres",
	}),
});

export { AlergiaFormSchema };
