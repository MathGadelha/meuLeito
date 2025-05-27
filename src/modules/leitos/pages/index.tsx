import { Card } from "@components/ui/card";
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
				{/* {leitos.map((leito) => (
					<Card
						key={leito.leitoId}
						className={`flex flex-row h-44 items-center justify-between p-4 rounded-lg shadow-md hover:cursor-pointer hover:scale-105 transition-all duration-200 ${leito.ocupado ? "bg-red-500" : "bg-green-500"
							}`}
						onClick={() => {
							setLeitoSelected(leito);
							setIsOpenLeitoDialog(true);
						}}
					>
						<div>
							<h2 className="text-white text-lg font-semibold">
								{leito.leito}
							</h2>
							<p className="text-white">
								{leito.ocupado ? "Ocupado" : "Disponível"}
							</p>
						</div>
						{leito.ocupado && leito.paciente && (
							<div className="flex flex-col bg-red-600 shadow-xl shadow-red-700 p-4 rounded-lg text-white">
								<p>Paciente: {leito.paciente.nome}</p>
								<p>Idade: {leito.paciente.idade} anos</p>
								<p>Sexo: {leito.paciente.sexo}</p>
							</div>
						)}
					</Card>
				))} */}
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
	// return (
	// 	<div>
	// 		<h1>Leitos Page</h1>
	// 		<p>This is the Leitos page.</p>
	// 	</div>
	// );
};

export { LeitosPage };
