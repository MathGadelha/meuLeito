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
import { alergiasData } from "../../services/getAlergias/getAlergias.dto";
import { AlergiaFormSchema } from "../../schema/alergias/alergiaFormSchema";
import { defaultValuesAlergia } from "../../schema/alergias/defaultValuesAlergia";
import { useCreateAlergiaService } from "../../services/postAlergia/postAlergia.service";
import { editAlergiaService } from "../../services/putAlergia/putAlergia.service";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSend: () => void;
	AlergiaSelected?: alergiasData;
	tipo: "C" | "E";
};

const AlergiasDialog = ({ isOpen, onOpenChange, AlergiaSelected, tipo, onSend }: dialogProp) => {

	const form = useForm<z.infer<typeof AlergiaFormSchema>>({
		resolver: zodResolver(AlergiaFormSchema),
		defaultValues: defaultValuesAlergia,
	});

	const styleForm = "w-full flex flex-col items-center gap-4 text-black";

	const editComorbidadeCustomForm: CustomFormProps = {
		form,
		schema: AlergiaFormSchema,
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

	async function onSubmit(data: z.infer<typeof AlergiaFormSchema>) {
		try {
			const params = {
				nome: data.nome,
			};

			if (tipo === "C") {
				await useCreateAlergiaService.execute(params)
			}
			if (tipo === "E" && AlergiaSelected) {
				await editAlergiaService.execute(String(AlergiaSelected.Id), params)
			}
			onSend();
			form.reset();
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		form.setValue("nome", AlergiaSelected?.Nome || "");
	}, [AlergiaSelected]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
						<p className="flex flex-row gap-2">{tipo === "C" ? "Criação de alergia" : "Edição de alergia"}</p>
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
						<CustomForm {...editComorbidadeCustomForm} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export { AlergiasDialog };
