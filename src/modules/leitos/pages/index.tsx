import { LeitoLayout } from "../components/layout";
import { indicadores } from "../mocks/leitos";
import { useEffect, useState } from "react";
import { LeitoDialog } from "../components/leitoDialog";
import { HeaderCard } from "../components/headerCard";
import { DataTable } from "@components/dataTable";
import { columnsLeitos } from "../components/leitosTableColumns";
import { ActionButton } from "@components/types/ActionButton";
import { ExternalLink } from "lucide-react";
import { leitosAdmin } from "@modules/adminLeitos/services/getLeitos/getLeitos.dto";
import { useGetLeitos } from "@modules/adminLeitos/services/getLeitos/getLeitos.service";
import { errorHandler } from "@api/errorHandler";

const LeitosPage = () => {
	const [isOpenLeitoDialog, setIsOpenLeitoDialog] = useState(false);
	const [leitoSelected, setLeitoSelected] = useState<leitosAdmin>(
		{} as leitosAdmin
	);

	const [leitos, setLeitos] = useState<leitosAdmin[]>([]);
	const [loading, setLoading] = useState(false);

	const actionButton: ActionButton[] = [
		{
			label: "Selecionar Leito",
			icon: <ExternalLink size={20} />,
			onClick: (row: leitosAdmin) => {
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

	async function listLeitos(search?: string) {
		try {
			setLoading(true);
			const params = {
				nome: search,
				idSetor: undefined,
				status: undefined,
				ativo: true
			}
			const response = await useGetLeitos.execute(params)
			setLeitos(response.data);
		} catch (error) {
			errorHandler(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		listLeitos();
	}, [])

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
					isLoading={loading}
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
