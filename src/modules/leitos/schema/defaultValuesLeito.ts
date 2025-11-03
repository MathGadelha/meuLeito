import { z } from "zod";
import { InserirPacienteLeitosFormSchema } from "./leitosFormSchema";

const defaultValuesInserirPacienteLeitos: z.infer<typeof InserirPacienteLeitosFormSchema> = {
	id_paciente: "",
};

export { defaultValuesInserirPacienteLeitos };
typeof InserirPacienteLeitosFormSchema;
