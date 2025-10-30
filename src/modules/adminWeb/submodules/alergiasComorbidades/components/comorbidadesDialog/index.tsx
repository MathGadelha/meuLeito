import { CustomForm } from "@components/customForm";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormProps } from "@shared/types/customFormProps";
import { useEffect } from "react";
// import { useState } from "react";
import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
import { z } from "zod";
import { errorHandler } from "@api/errorHandler";
import { ComorbidadesFormSchema } from "../../schema/comorbidades/comorbidadesFormSchema";
import { defaultValuesComorbidades } from "../../schema/comorbidades/defaultValuesComorbidades";
import { useCreateComorbidadeService } from "../../services/postComorbidades/postComorbidades.service";
import { comorbidadesData } from "../../services/getComorbidades/getComorbidades.dto";
import { editComorbidadeService } from "../../services/putComorbidade/putComorbidade.service";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSend: () => void;
	comorbidadeSelected?: comorbidadesData;
	tipo: "C" | "E";
};

const ComorbidadesDialog = ({ isOpen, onOpenChange, comorbidadeSelected, tipo, onSend }: dialogProp) => {

	const form = useForm<z.infer<typeof ComorbidadesFormSchema>>({
		resolver: zodResolver(ComorbidadesFormSchema),
		defaultValues: defaultValuesComorbidades,
	});

	const styleForm = "w-full flex flex-col items-center gap-4 text-black";

	const editComorbidadeCustomForm: CustomFormProps = {
		form,
		schema: ComorbidadesFormSchema,
		onsubmit: form.handleSubmit((data) => {
			onSubmit(data);
			// console.log(data);
		}),
		inputs: [
			{
				name: "nome",
				type: "text",
				label: "Número do Leito",
				id: "usuario",
				styleDiv: "w-full",
			},
		],
		styleForm,
		styleButton: "w-full bg-[#032B43] text-white hover:bg-[#063552]",
		buttonLabel: "Continuar",
	};

	async function onSubmit(data: z.infer<typeof ComorbidadesFormSchema>) {
		try {
			const params = {
				nome: data.nome,
			};

			if (tipo === "C") {
				await useCreateComorbidadeService.execute(params)
			}
			if (tipo === "E" && comorbidadeSelected) {
				await editComorbidadeService.execute(String(comorbidadeSelected.Id), params)
			}
			onSend();
			form.reset();
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		form.setValue("nome", comorbidadeSelected?.Nome || "");
	}, [comorbidadeSelected]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
						<p className="flex flex-row gap-2">{tipo === "C" ? "Criação de comorbidade" : "Edição de comorbidade"}</p>
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
						<CustomForm {...editComorbidadeCustomForm} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export { ComorbidadesDialog };
