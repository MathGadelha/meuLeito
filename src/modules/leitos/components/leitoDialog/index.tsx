import { errorHandler } from "@api/errorHandler";
import { OptionSelectPaginate, SelectPaginate } from "@components/selectPaginate";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { leitosAdmin } from "@modules/adminLeitos/services/getLeitos/getLeitos.dto";
import { ListPacientes } from "@modules/adminWeb/services/listPacientes/listPacientes.service";
import { defaultValuesInserirPacienteLeitos } from "@modules/leitos/schema/defaultValuesLeito";
import { InserirPacienteLeitosFormSchema } from "@modules/leitos/schema/leitosFormSchema";
import { pacienteLeitoData } from "@modules/leitos/services/getPacienteLeito/getPacienteLeito.dto";
import { useGetPacienteLeitos } from "@modules/leitos/services/getPacienteLeito/getPacienteLeito.service";
import { LeitoSelected } from "@modules/leitos/types/leitoSelected";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { z } from "zod";
import { CadastroSheet } from "../cadastroSheet";
import { useInserirPacienteService } from "@modules/leitos/services/inserirPaciente/inserirPaciente.service";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	leitoSelected: leitosAdmin;
};

const LeitoDialog = ({ isOpen, onOpenChange, leitoSelected }: dialogProp) => {

	const [searchPaciente, setSearchPaciente] = useState("");
	const [pacientes, setPacientes] = useState<OptionSelectPaginate[]>([]);
	const [form, setForm] = useState(false);
	const [tipo, setTipo] = useState<"E" | "A">();
	const [pacienteLeito, setPacienteLeito] = useState<pacienteLeitoData>({} as pacienteLeitoData);
	const [cadastroSheet, setCadastroSheet] = useState(false);

	const formInserirPaciente = useForm<z.infer<typeof InserirPacienteLeitosFormSchema>>({
		resolver: zodResolver(InserirPacienteLeitosFormSchema),
		defaultValues: defaultValuesInserirPacienteLeitos,
	});

	function calcularIdade(dataNascimento: string) {
		const hoje = dayjs();
		const nascimento = dayjs(dataNascimento);
		return hoje.diff(nascimento, "year");
	}

	async function getPacienteLeito() {
		try {
			const response = await useGetPacienteLeitos.execute(leitoSelected.Id.toString());
			setPacienteLeito(response.data[0]);
		} catch (error) {
			// errorHandler(error);
		}
	}

	async function getPaciente() {
		try {
			const response = await ListPacientes.execute(searchPaciente)
			const pacientesOptions = response.data.map((paciente) => ({
				label: `${paciente.Nome}  -  ${paciente.CPF} - ${calcularIdade(paciente.Nascimento)} anos`,
				value: paciente.Id.toString(),
			}));
			setPacientes(pacientesOptions);
		} catch (error) {
			errorHandler(error);
		}
	}

	async function onSubmit() {
		try {
			const params = {
				id_paciente: Number(formInserirPaciente.getValues("id_paciente")),
				id_leito: leitoSelected.Id
			}
			await useInserirPacienteService.execute(params)
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		getPacienteLeito();
	}, [leitoSelected])

	useEffect(() => {
		const debounce = setTimeout(() => {
			searchPaciente && getPaciente();
		}, 750);

		return () => clearTimeout(debounce);

	}, [searchPaciente]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
						{leitoSelected.Nome}
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
						<div className="flex flex-col gap-4">
							{form ? (
								<div className="flex flex-col gap-2">
									{tipo === "E" && (
										<p className="text-zinc-600 dark:text-zinc-400">
											Confirma a alta do paciente {pacienteLeito.Nome}?
										</p>
									)}
									{tipo === "A" && (
										<>
											<p className="text-zinc-600 dark:text-zinc-400">
												Pesquise por aqui o paciente, caso ele já esteja cadastrado no sistema os próximos dados serão preenchidos.
											</p>
											<Form {...formInserirPaciente}>
												<form
													onSubmit={formInserirPaciente.handleSubmit(onSubmit)}
													className="flex flex-col gap-4 p-6 text-black"
												>
													<FormField
														control={formInserirPaciente.control}
														name="id_paciente"
														render={() => (
															<FormItem>
																<FormControl>
																	<SelectPaginate
																		inputValue={searchPaciente}
																		label="Pesquise pelo Paciente."
																		options={pacientes}
																		placeholder=""
																		onInputValueChange={(e) => setSearchPaciente(e)}
																		setSelecionadoSelect={(e) =>
																			formInserirPaciente.setValue("id_paciente", e ? e.value : "")
																		}
																		clearInput={() => {
																			setPacientes([]);
																			formInserirPaciente.setValue("id_paciente", "");
																			setSearchPaciente("");
																		}}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<p className="text-zinc-600">Não achou o paciente? clique aqui para cadastrar.<span className="text-blue-600 cursor-pointer" onClick={() => setCadastroSheet(true)}> Cadastrar</span></p>
													<div className="w-full flex justify-end mt-8 col-span-2">

														<Button type="submit" className="w-1/2">
															Enviar
														</Button>
													</div>

												</form>
											</Form>
										</>

									)}
								</div>
							) : (
								<>
									<p>
										<strong>Status:</strong>{" "}
										<span
											className={`font-medium ${leitoSelected.Status === "Ocupado" ? "text-red-500" : "text-green-500"
												}`}
										>
											{leitoSelected.Status}
										</span>
									</p>

									{leitoSelected.Status === "Ocupado" && pacienteLeito && (
										<div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
											<p>
												<strong>Paciente:</strong> {pacienteLeito.Nome}
											</p>
											<p>
												<strong>Idade:</strong> {calcularIdade(pacienteLeito.Nascimento)} anos
											</p>
											<p>
												<strong>Data de Nascimento:</strong> {dayjs(pacienteLeito.Nascimento).format("DD/MM/YYYY")}
											</p>
											<p>
												<strong>Sexo:</strong> {pacienteLeito.Sexo === "M" ? "Masculino" : "Feminino"}
											</p>
											<p>
												Ao clicar no botão abaixo, você poderá dar alta ou transferir o paciente para outro leito. Escolha a opção desejada para atualizar o status do paciente.
											</p>
											<Button className="mt-5 bg-primary hover:bg-[#032b43]" onClick={() => {
												setForm(true);
												setTipo("E");
											}}>
												Alta / Transferência
											</Button>
										</div>
									)}

									{leitoSelected.Status === "Livre" && !pacienteLeito && (
										<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-600">
											<p className="mb-2 font-medium">
												O leito escolhido está disponível.
											</p>
											<ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
												<li>Você pode adicionar um paciente a este leito.</li>
												<li>Pesquise pelo nome do paciente.</li>
												<li>
													Clique no botão <strong>"Adicionar Paciente" para prosseguir.</strong>.
												</li>
											</ul>
											<Button className="mt-5 bg-primary hover:bg-[#032b43]" onClick={() => {
												setForm(true);
												setTipo("A");
											}}>
												Adicionar Paciente
											</Button>
										</div>
									)}
								</>
							)}
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent >
			{cadastroSheet && (
				<CadastroSheet
					isOpen={cadastroSheet}
					onOpenChange={setCadastroSheet}
					onSuccess={() => {
						setCadastroSheet(false);
					}}
				/>
			)}

		</Dialog >
	);
};

export { LeitoDialog };
