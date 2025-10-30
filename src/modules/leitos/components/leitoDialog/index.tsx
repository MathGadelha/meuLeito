import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { LeitoSelected } from "@modules/leitos/types/leitoSelected";
import { useState } from "react";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	leitoSelected: LeitoSelected;
};

const LeitoDialog = ({ isOpen, onOpenChange, leitoSelected }: dialogProp) => {

	const [form, setForm] = useState(false);
	const [tipo, setTipo] = useState<"E" | "A">();

	// const [searchPaciente, setSearchPaciente] = useState("");
	// const [listPacientes, setListPacientes] = useState<Array<{ value: string; label: string }>>([]);

	// async function getPacientes() {
	// 	try {
	// 		const response = await fetch("/api/pacientes");
	// 		setListPacientes(data);
	// 	} catch (error) {
	// 		errorHandler(error);
	// 	}
	// }

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
						Leito {leitoSelected.label}
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
						<div className="flex flex-col gap-4">
							{form ? (
								<div className="flex flex-col gap-2">
									{tipo === "E" && (
										<p className="text-zinc-600 dark:text-zinc-400">
											Confirma a alta do paciente {leitoSelected.paciente?.nome ?? "desconhecido"}?
										</p>
									)}
									{tipo === "A" && (
										<>
											<p className="text-zinc-600 dark:text-zinc-400">
												Pesquise por aqui o paciente, caso ele já esteja cadastrado no sistema os próximos dados serão preenchidos.
											</p>
											{/* <SelectPaginate
												inputValue={searchPaciente}
												label="Pesquise pela filial."
												options={listPacientes}
												placeholder=""
												onInputValueChange={(e) => setSearchPaciente(e)}
												setSelecionadoSelect={(e) =>
													form.setValue("id_filial", e ? Number(e.value) : 0)
												}
												clearInput={() => {
													setListFarmacia([]);
													form.setValue("id_filial", 0);
													setSearchFilial("");
												}}
											/> */}
										</>

									)}
								</div>
							) : (
								<>
									<p>
										<strong>Status:</strong>{" "}
										<span
											className={`font-medium ${leitoSelected.ocupado ? "text-red-500" : "text-green-500"
												}`}
										>
											{leitoSelected.ocupado ? "Ocupado" : "Disponível"}
										</span>
									</p>

									{leitoSelected.ocupado && leitoSelected.paciente && (
										<div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
											<p>
												<strong>Paciente:</strong> {leitoSelected.paciente.nome}
											</p>
											<p>
												<strong>Idade:</strong> {leitoSelected.paciente.idade} anos
											</p>
											<p>
												<strong>Sexo:</strong> {leitoSelected.paciente.sexo}
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

									{!leitoSelected.ocupado && !leitoSelected.paciente && (
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
			</DialogContent>
		</Dialog>
	);
};

export { LeitoDialog };
