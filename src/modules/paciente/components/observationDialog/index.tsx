import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
// import { Select } from "@components/ui/select";
// import { Switch } from "@components/ui/switch";
// import { useState } from "react";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	success?: () => void;
};

const ObservationDialog = ({ isOpen, onOpenChange, success }: dialogProp) => {

	// const [prioridade, setPrioridade] = useState("");

	// const handleChange = (e: string) => {
	// 	setPrioridade(e);
	// };

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="flex justify-between">
						Edição de Usuário
					</DialogTitle>
					<DialogDescription>
						{/* <Select
							value={prioridade}
							onChange={(data) => console.log(data)}
							style={{
								padding: "8px 12px",
								borderRadius: "6px",
								border: "1px solid #ccc",
								fontSize: "14px",
								outline: "none",
							}}
						>
							<option value="">Selecione...</option>
							<option value="muito_urgente">Muito Urgente</option>
							<option value="urgente">Urgente</option>
							<option value="comum">Comum</option>
						</Select> */}
						<Input placeholder="Insira uma observação" className="mb-4 w-full" />
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
