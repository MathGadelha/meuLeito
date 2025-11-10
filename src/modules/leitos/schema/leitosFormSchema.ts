import { z } from "zod";

const InserirPacienteLeitosFormSchema = z.object({
	id_paciente: z.string().min(1, {
		message: "Você deve selecionar um paciente",
	}),
});

const TransferirPacienteLeitosFormSchema = z.object({
	id_leito: z.string().min(1, {
		message: "Você deve selecionar um leito",
	}),
});


export { InserirPacienteLeitosFormSchema, TransferirPacienteLeitosFormSchema };
