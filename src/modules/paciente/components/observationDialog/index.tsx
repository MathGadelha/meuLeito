import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Switch } from "@components/ui/switch";
import { useState } from "react";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	success?: () => void;
};

const ObservationDialog = ({ isOpen, onOpenChange, success }: dialogProp) => {

	const [checked, setChecked] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="flex justify-between">
						Edição de Usuário
					</DialogTitle>
					<DialogDescription>
						<div className="flex flex-col items-start justify-start">
							<p>Enviar observação? </p>
							<Switch className="mb-4" checked={checked} onCheckedChange={setChecked} />
						</div>
						<Input placeholder="Insira uma observação" disabled={!checked} className="mb-4 w-full" />
						<div className="w-full flex justify-end">
							<Button className="w-1/3" onClick={success}>Enviar Chamado</Button>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
export { ObservationDialog };
