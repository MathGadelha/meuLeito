import { z } from "zod";
import { LeitosAdminFormSchema } from "./leitosFormSchema";

const defaultValuesLeitos: z.infer<typeof LeitosAdminFormSchema> = {
	nome: "",
	setor: "",
	status: "Disponível",
};

export { defaultValuesLeitos };
typeof LeitosAdminFormSchema;
