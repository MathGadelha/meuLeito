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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { errorHandler } from "@api/errorHandler";
import { userData } from "../../services/listProfissionais/listProfissionais.dto";
import { ListPerfis } from "../../services/listPerfis/listPerfis.service";
import { perfilData } from "../../services/listPerfis/listPerfis.dto";
import { editProfissionaisService } from "../../services/putProfissionais/putProfissionais.service";
import { InputMask } from "@components/inputMask";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	profissionalSelected: userData;
	onSend: () => void;
};

const ProfissionalDialog = ({ isOpen, onOpenChange, profissionalSelected, onSend }: dialogProp) => {

	const [perfis, setPerfis] = useState<perfilData[]>([]);

	const formSchema = z.object({
		nome: z.string().optional(),
		cpf: z.string().optional(),
		dataNascimento: z.string().optional(),
		sexo: z.enum(["M", "F"], { message: "Selecione o sexo" }).optional(),
		senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
		idPerfil: z.string().min(1, "Selecione o perfil do usuário"),
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
			console.log("submit");
			const params = {
				nome: form.getValues("nome"),
				nascimento: form.getValues("dataNascimento"),
				sexo: form.getValues("sexo"),
				cpf: form.getValues("cpf"),
				senha: form.getValues("senha"),
				id_perfil: Number(form.getValues("idPerfil")),
			}
			await editProfissionaisService.execute(String(profissionalSelected.Id), params)
			onSend();
		} catch (error) {
			errorHandler(error);
		}
	}

	async function getPerfis() {
		try {
			const response = await ListPerfis.execute();
			setPerfis(response.data);
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		form.setValue("nome", profissionalSelected.Nome);
		form.setValue("cpf", profissionalSelected.CPF);
		form.setValue("dataNascimento", dayjs(profissionalSelected.Nascimento).format("YYYY-MM-DD"));
		form.setValue("sexo", profissionalSelected.Sexo);
		form.setValue("idPerfil", profissionalSelected.IdPerfil.toString());
	}, [profissionalSelected]);

	useEffect(() => {
		getPerfis();
	}, []);

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
									<FormField
										control={form.control}
										name="senha"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Senha</FormLabel>
												<FormControl>
													<Input placeholder="Insira a senha" type="password" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="idPerfil"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Perfil</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} value={field.value}>
														<SelectTrigger className="w-full border rounded px-3 py-2">
															<SelectValue placeholder="Selecione o perfil do profissional" />
														</SelectTrigger>
														<SelectContent>
															{perfis.map((perfil) => (
																<SelectItem key={perfil.Id} value={perfil.Id.toString()}>
																	{perfil.Nome}
																</SelectItem>
															))}
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

export { ProfissionalDialog };
