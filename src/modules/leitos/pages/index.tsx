import { LeitoLayout } from "../components/layout";
import { indicadores, leitos } from "../mocks/leitos";
import { useState } from "react";
import { LeitoDialog } from "../components/leitoDialog";
import { LeitoSelected } from "../types/leitoSelected";
import { HeaderCard } from "../components/headerCard";
import { DataTable } from "@components/dataTable";
import { columnsLeitos } from "../components/leitosTableColumns";
import { ActionButton } from "@components/types/ActionButton";
import { ExternalLink } from "lucide-react";

const LeitosPage = () => {
	const [isOpenLeitoDialog, setIsOpenLeitoDialog] = useState(false);
	const [leitoSelected, setLeitoSelected] = useState<LeitoSelected>(
		{} as LeitoSelected
	);

	const actionButton: ActionButton[] = [
		{
			label: "Selecionar Leito",
			icon: <ExternalLink size={20} />,
			onClick: (row: LeitoSelected) => {
				setLeitoSelected(row);
				setIsOpenLeitoDialog(true);
				// localStorage.setItem(
				// 	"@farmacias-selected-people",
				// 	JSON.stringify({ ...row, convenio: convenio[0], nomeConvenio: convenio[1] })
				// );
				// navigate('/farmacias/selecao-beneficiario/triagem')
			},
		},
	];

	return (
		<LeitoLayout>
			<p className="font-semibold text-xl">Leitos</p>
			<p className="text-slate-300">Gerencie os leitos aqui.</p>
			<div className="flex justify-center mt-4">
				<HeaderCard
					loading={false}
					cards={[
						{
							value: indicadores.livres,
							label: "Leitos Disponíveis",
						},
						{
							value: indicadores.ocupados,
							label: "Leitos Ocupados",
						},
						{
							value: indicadores.chamados_abertos,
							label: "Chamados abertos",
						},
					]}
				/>
			</div>
			<div className="w-full h-full p-8">
				<DataTable
					actions={actionButton}
					columns={columnsLeitos}
					data={leitos}
				/>
			</div>
			{isOpenLeitoDialog && (
				<LeitoDialog
					isOpen={isOpenLeitoDialog}
					onOpenChange={() => setIsOpenLeitoDialog(false)}
					leitoSelected={leitoSelected}
				/>
			)}
		</LeitoLayout>
	);
};

export { LeitosPage };
