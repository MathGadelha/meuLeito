import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@components/ui/dialog";
import { CustomForm } from "@components/customForm";
import { CustomFormProps } from "@customTypes/customFormProps";
import { useEffect, useRef } from "react";
import { FormSchemaPessoa } from "./forms/FormSchemaPessoa";
// import { inputsPessoa } from "@modules/administrativoWeb/submodules/pessoas/mocks/inputsPessoa";
import toast from "react-hot-toast";
import { z } from "zod";
import { defaultValuesPessoas } from "./forms/defaultValuesPessoas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { createPessoasService } from "@modules/administrativoWeb/submodules/pessoas/services/createPessoas/createPessoas.service";
import { errorHandler } from "@api/errorHandler";
import { Button } from "@components/ui/button";
import { PiPlus } from "react-icons/pi";

type Props = {
	buttonStyle: string;
};

const DialogCreatePessoaForm = ({ buttonStyle }: Props) => {
	const triggerDialogRef = useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof FormSchemaPessoa>>({
		resolver: zodResolver(FormSchemaPessoa),
		defaultValues: defaultValuesPessoas,
	});

	async function onSubmit() {
	// data: z.infer<typeof FormSchemaPessoa>
		// const params = {
		// 	...data,
		// 	data_nascimento: data.data_nascimento.replace(
		// 		/(\d{2})\/(\d{2})\/(\d{4})/,
		// 		"$3-$2-$1"
		// 	),
		// 	cpf: data.cpf.replace(/\D/g, ""),
		// 	nome: data.nome,
		// };
		toast.loading("Aguarde alguns instantes...");
		triggerDialogRef.current?.click();
		try {
			// await createPessoasService.execute(params);
			toast.success("Pessoa cadastrada com sucesso!");
		} catch (error) {
			errorHandler(error);
		}
	}

	const styleForm = "grid grid-cols-12 gap-2";
	const customFormPessoa: CustomFormProps = {
		form: form,
		schema: FormSchemaPessoa,
		onsubmit: form.handleSubmit(onSubmit),
		// inputs: inputsPessoa,
		styleForm,
		styleButton: "w-60 absolute bottom-5 right-5",
	};

	useEffect(() => {
		return () => {
			customFormPessoa.form.reset();
		};
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild ref={triggerDialogRef}>
				<Button
					variant={"default"}
					className={`${buttonStyle ? buttonStyle : "rounded-xl"}`}
				>
					<PiPlus size={15} className="mr-1" />
					Criar pessoa
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-4xl">
				<DialogHeader>
					<DialogTitle>Criar Pessoas</DialogTitle>
					<DialogDescription>
						Insira as informações abaixo para criar uma nova pessoa.
					</DialogDescription>
				</DialogHeader>
				<div className="w-full">
					<CustomForm {...customFormPessoa} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export { DialogCreatePessoaForm };
