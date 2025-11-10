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
import { defaultValuesInserirPacienteLeitos, defaultValuesTransferirPacienteLeitos } from "@modules/leitos/schema/defaultValuesLeito";
import { InserirPacienteLeitosFormSchema, TransferirPacienteLeitosFormSchema } from "@modules/leitos/schema/leitosFormSchema";
import { pacienteLeitoData } from "@modules/leitos/services/getPacienteLeito/getPacienteLeito.dto";
import { useGetPacienteLeitos } from "@modules/leitos/services/getPacienteLeito/getPacienteLeito.service";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form";
import { z } from "zod";
import { CadastroSheet } from "../cadastroSheet";
import { useInserirPacienteService } from "@modules/leitos/services/inserirPaciente/inserirPaciente.service";
import { altaPacienteService } from "@modules/leitos/services/altaPaciente/altaPaciente.service";
import { useGetLeitos } from "@modules/adminLeitos/services/getLeitos/getLeitos.service";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	leitoSelected: leitosAdmin;
	onSend: () => void;
};

type TipoAcao = "E" | "A" | "T";

const LeitoDialog = ({ isOpen, onOpenChange, leitoSelected, onSend }: dialogProp) => {

	const [searchPaciente, setSearchPaciente] = useState("");
	const [searchLeitos, setSearchLeitos] = useState("");
	const [pacientes, setPacientes] = useState<OptionSelectPaginate[]>([]);
	const [leitos, setLeitos] = useState<OptionSelectPaginate[]>([]);
	const [showForm, setShowForm] = useState(false);
	const [tipo, setTipo] = useState<TipoAcao>();
	const [pacienteLeito, setPacienteLeito] = useState<pacienteLeitoData>({} as pacienteLeitoData);
	const [cadastroSheet, setCadastroSheet] = useState(false);

	const [leitoDestinoNome, setLeitoDestinoNome] = useState("");

	const mountedRef = useRef(false);

	const formInserirPaciente = useForm<z.infer<typeof InserirPacienteLeitosFormSchema>>({
		resolver: zodResolver(InserirPacienteLeitosFormSchema),
		defaultValues: defaultValuesInserirPacienteLeitos,
	});

	const formTransferirPaciente = useForm<z.infer<typeof TransferirPacienteLeitosFormSchema>>({
		resolver: zodResolver(TransferirPacienteLeitosFormSchema),
		defaultValues: defaultValuesTransferirPacienteLeitos,
	});

	const calcularIdade = useCallback((dataNascimento: string) => {
		if (!dataNascimento) return 0;
		const hoje = dayjs();
		const nascimento = dayjs(dataNascimento);
		return hoje.diff(nascimento, "year");
	}, []);

	const labelPaciente = useCallback(
		(p: { Nome: string; CPF: string; Nascimento: string }) =>
			`${p.Nome}  -  ${p.CPF} - ${calcularIdade(p.Nascimento)} anos`,
		[calcularIdade]
	);

	const labelLeito = useCallback(
		(p: { Nome: string; NomeSetor: string; }) =>
			`${p.Nome}  -  ${p.NomeSetor}`,
		[calcularIdade]
	);

	const pacienteResumo = useMemo(() => {
		if (!pacienteLeito?.NomePaciente) return null;
		return {
			nome: pacienteLeito.NomePaciente,
			idade: calcularIdade(pacienteLeito.NascimentoPaciente),
			nascFmt: pacienteLeito.NascimentoPaciente
				? dayjs(pacienteLeito.NascimentoPaciente).format("DD/MM/YYYY")
				: "",
			sexo: pacienteLeito.SexoPaciente === "M" ? "Masculino" : "Feminino",
		};
	}, [pacienteLeito, calcularIdade]);

	const getPacienteLeito = useCallback(async () => {
		try {
			if (!isOpen || !leitoSelected?.Id) return;
			const response = await useGetPacienteLeitos.execute(leitoSelected.Id.toString());
			if (!mountedRef.current) return;
			setPacienteLeito(response.data?.[0] || ({} as pacienteLeitoData));
		} catch (error) {
			errorHandler(error);
		}
	}, [isOpen, leitoSelected?.Id]);

	const getPaciente = useCallback(async () => {
		try {
			const params = {
				page: 1,
				pageSize: 10,
				nome: searchPaciente
			}
			const response = await ListPacientes.execute(params);
			if (!mountedRef.current) return;
			const pacientesOptions = response.data.map((paciente) => ({
				label: labelPaciente(paciente),
				value: paciente.Id.toString(),
			}));
			setPacientes(pacientesOptions);
		} catch (error) {
			errorHandler(error);
		}
	}, [searchPaciente, labelPaciente]);

	async function listLeitos() {
		try {
			// setLoading(true);
			const params = {
				nome: searchLeitos,
				id_setor: undefined,
				status: undefined,
				ativo: true
			}
			const response = await useGetLeitos.execute(params);
			const leitosOptions = response.data.map((leito) => ({
				label: labelLeito(leito),
				value: leito.Id.toString(),
			}));
			setLeitos(leitosOptions);

		} catch (error) {
			errorHandler(error);
		} finally {
			// setLoading(false);
		}
	}

	const onSubmitAdicionar = useCallback(async () => {
		try {
			const params = {
				id_paciente: Number(formInserirPaciente.getValues("id_paciente")),
				id_leito: leitoSelected.Id,
			};
			await useInserirPacienteService.execute(params);
			onSend();
		} catch (error) {
			errorHandler(error);
		}
	}, [formInserirPaciente, leitoSelected.Id, onSend]);

	async function onSubmitAlta() {
		try {
			await altaPacienteService.execute(pacienteLeito.Id.toString());
			onSend();
		} catch (error) {
			errorHandler(error);
		}
	}

	const onSubmitTransferencia = useCallback(async () => {
		try {
			if (!pacienteLeito?.IdPaciente) throw new Error("Paciente não encontrado para transferência.");
			if (!leitoDestinoNome?.trim()) throw new Error("Informe o nome do leito de destino.");

			onSend();
		} catch (error) {
			errorHandler(error);
		}
	}, [leitoDestinoNome, pacienteLeito?.IdPaciente, leitoSelected?.Id, onSend]);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		// setShowForm(false);
		// setTipo(undefined);
		// setLeitoDestinoNome("");
		getPacienteLeito();
	}, [isOpen, leitoSelected?.Id, getPacienteLeito]);

	useEffect(() => {
		if (!isOpen) return;
		const debounce = setTimeout(() => {
			if (searchPaciente.trim()) getPaciente();
		}, 500);
		return () => clearTimeout(debounce);
	}, [isOpen, searchPaciente, getPaciente]);

	useEffect(() => {
		if (!isOpen) return;
		const debounce = setTimeout(() => {
			if (searchLeitos.trim()) listLeitos();
		}, 500);
		return () => clearTimeout(debounce);
	}, [searchLeitos]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
						{leitoSelected?.Nome}
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
						<div className="flex flex-col gap-4">
							{showForm ? (
								<div className="flex flex-col gap-3">
									{tipo === "E" && (
										<>
											<p className="text-zinc-600 dark:text-zinc-400">
												Confirma a alta do paciente {pacienteLeito?.NomePaciente}?
											</p>
											<Button
												className="w-1/2 mt-2 bg-primary hover:bg-[#032b43]"
												onClick={onSubmitAlta}
											>
												Confirmar alta
											</Button>
										</>
									)}

									{tipo === "A" && (
										<>
											<p className="text-zinc-600 dark:text-zinc-400">
												Pesquise por aqui o paciente. Se já existir no sistema, os dados serão
												preenchidos.
											</p>
											<Form {...formInserirPaciente}>
												<form
													onSubmit={formInserirPaciente.handleSubmit(onSubmitAdicionar)}
													className="flex flex-col gap-4 p-2 text-black"
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
																			formInserirPaciente.setValue(
																				"id_paciente",
																				e ? e.value : ""
																			)
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

													<p className="text-zinc-600">
														Não achou o paciente?
														<span
															className="text-blue-600 cursor-pointer ml-1"
															onClick={() => setCadastroSheet(true)}
														>
															Cadastrar
														</span>
													</p>

													<div className="w-full flex justify-end mt-4">
														<Button type="submit" className="w-1/2">
															Enviar
														</Button>
													</div>
												</form>
											</Form>
										</>
									)}

									{tipo === "T" && (
										<div className="flex flex-col gap-3">
											<div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
												<p>
													<strong>Paciente:</strong> {pacienteResumo?.nome || "—"}
												</p>
												<p>
													<strong>Idade:</strong> {pacienteResumo?.idade ?? "—"} anos
												</p>
												<p>
													<strong>Nascimento:</strong> {pacienteResumo?.nascFmt || "—"}
												</p>
												<p>
													<strong>Sexo:</strong> {pacienteResumo?.sexo || "—"}
												</p>
												<p className="mt-2">
													<strong>Leito atual:</strong> {leitoSelected?.Nome}
												</p>
											</div>

											<div className="flex flex-col">
												<SelectPaginate
													inputValue={searchLeitos}
													label="Pesquise pelo Leito."
													options={leitos}
													placeholder=""
													onInputValueChange={(e) => setSearchLeitos(e)}
													setSelecionadoSelect={(e) =>
														formTransferirPaciente.setValue(
															"id_leito",
															e ? e.value : ""
														)
													}
													clearInput={() => {
														setLeitos([]);
														formTransferirPaciente.setValue("id_leito", "");
														setSearchLeitos("");
													}}
												/>
											</div>

											<div className="w-full flex justify-end mt-2">
												<Button onClick={onSubmitTransferencia} className="w-1/2">
													Confirmar transferência
												</Button>
											</div>
										</div>
									)}
								</div>
							) : (
								<>
									<p>
										<strong>Status:</strong>{" "}
										<span
											className={`font-medium ${leitoSelected?.Status === "Ocupado" ? "text-red-500" : "text-green-500"
												}`}
										>
											{leitoSelected?.Status}
										</span>
									</p>

									{leitoSelected?.Status === "Ocupado" && pacienteResumo && (
										<div className="flex flex-row justify-between bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
											<div className="space-y-1">
												<p>
													<strong>Paciente:</strong> {pacienteResumo.nome}
												</p>
												<p>
													<strong>Idade:</strong> {pacienteResumo.idade} anos
												</p>
												<p>
													<strong>Data de Nascimento:</strong> {pacienteResumo.nascFmt}
												</p>
												<p>
													<strong>Sexo:</strong> {pacienteResumo.sexo}
												</p>
												<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
													Clique em um dos botões para prosseguir.
												</p>
											</div>

											<div className="flex flex-col justify-end gap-3 ml-8">
												<Button
													className="mt-2 bg-primary hover:bg-[#032b43]"
													onClick={() => {
														setShowForm(true);
														setTipo("E");
													}}
												>
													Alta
												</Button>

												<Button
													variant="outline"
													onClick={() => {
														setShowForm(true);
														setTipo("T");
													}}
												>
													Transferência
												</Button>
											</div>
										</div>
									)}

									{leitoSelected?.Status === "Livre" && (
										<div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-600">
											<p className="mb-2 font-medium">O leito escolhido está disponível.</p>
											<ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
												<li>Você pode adicionar um paciente a este leito.</li>
												<li>Pesquise pelo nome do paciente.</li>
												<li>
													Clique em <strong>"Adicionar Paciente"</strong> para prosseguir.
												</li>
											</ul>
											<Button
												className="mt-5 bg-primary hover:bg-[#032b43]"
												onClick={() => {
													setShowForm(true);
													setTipo("A");
												}}
											>
												Adicionar Paciente
											</Button>
										</div>
									)}
								</>
							)}
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>

			{cadastroSheet && (
				<CadastroSheet
					isOpen={cadastroSheet}
					onOpenChange={setCadastroSheet}
					onSuccess={() => setCadastroSheet(false)}
				/>
			)}
		</Dialog>
	);
};

export { LeitoDialog };
