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
			<DialogContent className="max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="flex justify-between">
						Leito {leitoSelected.label}
					</DialogTitle>
					<DialogDescription>
						<div className="flex flex-col">
							<p className="text-slate-300">
								Status: {leitoSelected.ocupado ? "Ocupado" : "Disponível"}
							</p>
							{leitoSelected.ocupado && leitoSelected.paciente && (
								<div className="p-4">
									<p>Paciente: {leitoSelected.paciente.nome}</p>
									<p>Idade: {leitoSelected.paciente.idade} anos</p>
									<p>Sexo: {leitoSelected.paciente.sexo}</p>
								</div>
							)}
							{!leitoSelected.ocupado && !leitoSelected.paciente && (
								<div className="p-4">
									<p>O leito escolhido está disponível</p>
									<p>Você pode adicionar um paciente a este leito.</p>
									<p>
										Para isso, pesquise por nome e clique no botão "Adicionar
										Paciente".
									</p>
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
