import { z } from "zod";

const SetoresFormSchema = z.object({
	nome: z.string().min(3, {
		message: "Nome deve conter pelo menos 6 caracteres",
	}),
});

export { SetoresFormSchema };
