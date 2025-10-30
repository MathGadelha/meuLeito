import { z } from "zod";
import { AlergiaFormSchema } from "./alergiaFormSchema";

const defaultValuesAlergia: z.infer<typeof AlergiaFormSchema> = {
	nome: "",
};

export { defaultValuesAlergia };
typeof AlergiaFormSchema;
