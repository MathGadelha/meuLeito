import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { userData } from "@modules/adminWeb/services/listPacientes/listPacientes.dto";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import dayjs from "dayjs";
import { errorHandler } from "@api/errorHandler";
import { editPacienteService } from "@modules/adminWeb/services/putPaciente/putPaciente.service";
import { InputMask } from "@components/inputMask";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	pacienteSelected: userData;
	onSend: () => void;
};

const PacienteDialog = ({ isOpen, onOpenChange, pacienteSelected, onSend }: dialogProp) => {

	const formSchema = z.object({
		nome: z.string().optional(),
		cpf: z.string().optional(),
		dataNascimento: z.string().optional(),
		sexo: z.enum(["M", "F"], { message: "Selecione o sexo" }).optional(),
	});

	type FormData = z.infer<typeof formSchema>;

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
			cpf: "",
			dataNascimento: "",
			sexo: "M",
		},
	});

	async function onSubmit() {
		try {
			const params = {
				nome: form.getValues("nome"),
				nascimento: form.getValues("dataNascimento"),
				sexo: form.getValues("sexo"),
				cpf: form.getValues("cpf")
			}
			await editPacienteService.execute(String(pacienteSelected.Id), params)
			onSend();
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		form.setValue("nome", pacienteSelected.Nome);
		form.setValue("cpf", pacienteSelected.CPF);
		form.setValue("dataNascimento", dayjs(pacienteSelected.Nascimento).format("YYYY-MM-DD"));
		form.setValue("sexo", pacienteSelected.Sexo);
	}, [pacienteSelected]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="flex justify-between">
						Edição de Paciente
					</DialogTitle>
					<DialogDescription>
						<div className="flex flex-col">
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="p-4 grid grid-cols-2 gap-4 text-black">
									<FormField
										control={form.control}
										name="nome"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nome</FormLabel>
												<FormControl>
													<Input placeholder="Seu nome completo" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="cpf"
										render={({ field }) => (
											<FormItem>
												<FormLabel>CPF</FormLabel>
												<FormControl>
													<InputMask
														mask="999.999.999-99"
														value={field.value}
														onChange={field.onChange}
														placeholder="000.000.000-00"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="dataNascimento"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Data de Nascimento</FormLabel>
												<FormControl>
													<Input type="date" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="sexo"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Sexo</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} value={field.value}>
														<SelectTrigger className="w-full border rounded px-3 py-2">
															<SelectValue placeholder="Selecione o sexo" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="M">Masculino</SelectItem>
															<SelectItem value="F">Feminino</SelectItem>
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="w-full flex justify-end p-4 col-span-2 mt-4">
										<Button
											variant="outline"
											onClick={() => onOpenChange(false)}
											className="mr-2 w-1/4"
										>
											Fechar
										</Button>
										<Button className="w-1/4" type="submit">Salvar</Button>
									</div>
								</form>
							</Form>
						</div>

					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export { PacienteDialog };
