import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};
const DialogLogout = ({ isOpen, onClose }: Props) => {
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.clear();
		navigate("/");
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						<div className="flex items-center gap-2">
							<FiAlertCircle color="orange" size={24} />
							Alerta de Logout
						</div>
					</DialogTitle>
					<DialogDescription>
						Você confirma que deseja sair da aplicação?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button onClick={handleLogout}>Confirmar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export { DialogLogout };
