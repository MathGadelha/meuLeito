import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { usuariosData } from "@modules/adminWeb/types/usuarios.dto";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	usuarioSelected: usuariosData;
};

const UserDialog = ({ isOpen, onOpenChange, usuarioSelected }: dialogProp) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="flex justify-between">
						Edição de Usuário
					</DialogTitle>
					<DialogDescription>
						<div className="flex flex-col">
							{usuarioSelected && (
								<div className="p-4 grid grid-cols-2 gap-4">
									<div>
										<p>Usuário</p>
										<Input value={usuarioSelected.usuario} />
									</div>
									<div>
										<p>Nome</p>
										<Input value={usuarioSelected.nome} />
									</div>{" "}
									<div>
										<p>Data de nascimento</p>
										<Input value={usuarioSelected.dataNascimento} />
									</div>{" "}
									<div>
										<p>Email</p>
										<Input value={usuarioSelected.email} />
									</div>
								</div>
							)}
						</div>
						<div className="w-full flex justify-end p-4">
							<Button
								variant="outline"
								onClick={() => onOpenChange(false)}
								className="mr-2 w-1/4"
							>
								Fechar
							</Button>
							<Button className="w-1/4">Salvar</Button>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
export { UserDialog };
