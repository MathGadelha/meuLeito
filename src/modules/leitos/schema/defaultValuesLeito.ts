import { z } from "zod";
import { InserirPacienteLeitosFormSchema, TransferirPacienteLeitosFormSchema } from "./leitosFormSchema";

const defaultValuesInserirPacienteLeitos: z.infer<typeof InserirPacienteLeitosFormSchema> = {
	id_paciente: "",
};

const defaultValuesTransferirPacienteLeitos: z.infer<typeof TransferirPacienteLeitosFormSchema> = {
	id_leito: "",
};

export { defaultValuesInserirPacienteLeitos, defaultValuesTransferirPacienteLeitos };
typeof InserirPacienteLeitosFormSchema;
typeof TransferirPacienteLeitosFormSchema;

