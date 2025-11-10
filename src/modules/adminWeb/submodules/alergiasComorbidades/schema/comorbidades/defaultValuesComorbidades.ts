import { z } from "zod";
import { ComorbidadesFormSchema } from "./comorbidadesFormSchema";

const defaultValuesComorbidades: z.infer<typeof ComorbidadesFormSchema> = {
	nome: "",
};

export { defaultValuesComorbidades };
typeof ComorbidadesFormSchema;
