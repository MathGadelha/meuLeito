import { z } from "zod";

const formSchema = z.object({
	dataInicial: z.string().optional(),
	dataFinal: z.string().optional(),
	selectPaginate: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		})
	),
	itemsOfSelect: z.array(
		z.object({
			label: z.string(),
			id: z.string(),
		})
	),
	radioGroupSelect: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		})
	),
	checkBoxGroupSelect: z.array(
		z.object({
			label: z.string(),
			value: z.array(z.string()).refine((value) => value.some((item) => item)),
		})
	),
	inputGroup: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		})
	),
});

export { formSchema };
export type FormSchema = z.infer<typeof formSchema>;
