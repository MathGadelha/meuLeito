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
import { setor } from "../../services/getSetores/getSetores.dto";
import { LuMapPin } from "react-icons/lu";
import { SetoresFormSchema } from "../../schema/setorFormSchema";
import { defaultValuesSetor } from "../../schema/defaultValuesSetor";
import { errorHandler } from "@api/errorHandler";
import { editSetorService } from "../../services/putSetor/putSetor.service";
import { useCreateSetorService } from "../../services/postSetores/postSetor.service";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSend: () => void;
	setorSelected?: setor;
	tipo: "C" | "E";
};

const SetoresDialog = ({ isOpen, onOpenChange, setorSelected, tipo, onSend }: dialogProp) => {

	const form = useForm<z.infer<typeof SetoresFormSchema>>({
		resolver: zodResolver(SetoresFormSchema),
		defaultValues: defaultValuesSetor,
	});

	const styleForm = "w-full flex flex-col items-center gap-4 text-black";

	const editLeitoCustomForm: CustomFormProps = {
		form,
		schema: SetoresFormSchema,
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

	async function onSubmit(data: z.infer<typeof SetoresFormSchema>) {
		try {
			const params = {
				nome: data.nome,
			};

			if (tipo === "C") {
				await useCreateSetorService.execute(params)
			}
			if (tipo === "E" && setorSelected) {
				await editSetorService.execute(String(setorSelected.Id), params)
			}
			onSend();
			form.reset();
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		form.setValue("nome", setorSelected?.Nome || "");
	}, [setorSelected]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
						<p className="flex flex-row gap-2"><LuMapPin />{tipo === "C" ? "Criação de setor" : "Edição de setor"}</p>
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
						<CustomForm {...editLeitoCustomForm} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export { SetoresDialog };
