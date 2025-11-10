import { z } from "zod";
import { SetoresFormSchema } from "./setorFormSchema";

const defaultValuesSetor: z.infer<typeof SetoresFormSchema> = {
	nome: "",
};

export { defaultValuesSetor };
typeof SetoresFormSchema;
