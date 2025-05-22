import { Card } from "@components/ui/card";
import { LeitoLayout } from "../components/layout";
import { leitos } from "../mocks/leitos";
import { useState } from "react";
import { LeitoDialog } from "../components/leitoDialog";
import { LeitoSelected } from "../types/leitoSelected";

const LeitosPage = () => {
	const [isOpenLeitoDialog, setIsOpenLeitoDialog] = useState(false);
	const [leitoSelected, setLeitoSelected] = useState<LeitoSelected>(
		{} as LeitoSelected
	);

	return (
		<LeitoLayout>
			<p className="font-semibold text-xl">Leitos</p>
			<p className="text-slate-300">Gerencie os leitos aqui.</p>
			<div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{leitos.map((leito) => (
					<Card
						key={leito.leitoId}
						className={`flex flex-row h-44 items-center justify-between p-4 rounded-lg shadow-md hover:cursor-pointer hover:scale-105 transition-all duration-200 ${
							leito.ocupado ? "bg-red-500" : "bg-green-500"
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
				))}
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
