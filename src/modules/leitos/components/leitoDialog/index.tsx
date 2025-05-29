import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { LeitoSelected } from "@modules/leitos/types/leitoSelected";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	leitoSelected: LeitoSelected;
};

const LeitoDialog = ({ isOpen, onOpenChange, leitoSelected }: dialogProp) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
						Leito {leitoSelected.label}
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
						<div className="flex flex-col gap-4">
							<p>
								<strong>Status:</strong>{" "}
								<span
									className={`font-medium ${
										leitoSelected.ocupado ? "text-red-500" : "text-green-500"
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
											Clique no botão <strong>"Adicionar Paciente"</strong>.
										</li>
									</ul>
								</div>
							)}
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export { LeitoDialog };
