// import { errorHandler } from "@api/errorHandler";
import { CustomForm } from "@components/customForm";
// import { SelectPaginate } from "@components/selectPaginate";
// import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValuesLeitos } from "@modules/adminLeitos/schema/defaultValuesLeito";
import { LeitosAdminFormSchema } from "@modules/adminLeitos/schema/leitosFormSchema";
import { leitosAdmin } from "@modules/adminLeitos/services/getLeitos/getLeitos.dto";
import { CustomFormProps } from "@shared/types/customFormProps";
import { useEffect } from "react";
// import { useState } from "react";
import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
import { z } from "zod";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	leitoSelected: leitosAdmin;
};

const LeitoDialogAdmin = ({ isOpen, onOpenChange, leitoSelected }: dialogProp) => {

	// async function getPacientes() {
	// 	try {
	// 		const response = await fetch("/api/pacientes");
	// 		setListPacientes(data);
	// 	} catch (error) {
	// 		errorHandler(error);
	// 	}
	// }

	const form = useForm<z.infer<typeof LeitosAdminFormSchema>>({
		resolver: zodResolver(LeitosAdminFormSchema),
		defaultValues: defaultValuesLeitos,
	});

	const styleForm = "w-full flex flex-col items-center gap-4 text-black";

	const editLeitoCustomForm: CustomFormProps = {
		form,
		schema: LeitosAdminFormSchema,
		onsubmit: form.handleSubmit((data) => {
			console.log(data);
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
			{
				name: "setor",
				type: "text",
				label: "Setor",
				id: "setor",
				styleDiv: "w-full",
			},
			{
				name: "status",
				type: "text",
				label: "Setor",
				id: "setor",
				styleDiv: "w-full",
			},
		],
		styleForm,
		styleButton: "w-full bg-[#032B43] text-white hover:bg-[#063552]",
		buttonLabel: "Continuar",
	};

	useEffect(() => {
		form.setValue("nome", leitoSelected.Nome);
		form.setValue("setor", leitoSelected.IdSetor.toString());
		form.setValue("status", leitoSelected.Status);
	}, [leitoSelected]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
						Leito {leitoSelected.Nome}
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
						<CustomForm {...editLeitoCustomForm} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export { LeitoDialogAdmin };
