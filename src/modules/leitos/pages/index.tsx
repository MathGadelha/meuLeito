import { LeitoLayout } from "../components/layout";
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
import { permissionsByModule } from "@shared/configs/permissionByModule";
import { useVerifyIfHasProfileToAccessModule } from "@shared/hooks/validationsPerfis/useVerifyIfHasProfileToAccessModule";
import { useGetSetores } from "@modules/adminWeb/submodules/setores/services/getSetores/getSetores.service";
import { FilterPopover } from "@components/filter/Filter";
import { useUserContext } from "@shared/context/user/useUserContext";
import { FilterOptions } from "@shared/types/filterOptions";

const LeitosPage = () => {
	const [isOpenLeitoDialog, setIsOpenLeitoDialog] = useState(false);
	const [leitoSelected, setLeitoSelected] = useState<leitosAdmin>(
		{} as leitosAdmin
	);
	const [setores, setSetores] = useState<FilterOptions[]>([]);
	const [leitos, setLeitos] = useState<leitosAdmin[]>([]);
	const [loading, setLoading] = useState(false);
	const [idSetor, setIdSetor] = useState<number>();
	const [ocupados, setOcupados] = useState<number>();
	const [livres, setLivres] = useState<number>();
	const [manutencao, setManutencao] = useState<number>();

	const { execute } = useVerifyIfHasProfileToAccessModule();
	const { setor } = useUserContext();

	const actionButton: ActionButton[] = [
		{
			label: "Selecionar Leito",
			icon: <ExternalLink size={20} />,
			onClick: (row: leitosAdmin) => {
				setLeitoSelected(row);
				setIsOpenLeitoDialog(true);
			},
		},
	];

	async function listLeitos() {
		try {
			setLoading(true);
			const params = {
				nome: "",
				id_setor: idSetor,
				status: undefined,
				ativo: true
			}
			const response = await useGetLeitos.execute(params);
			setLeitos(response.data);

			const ocupados = response.data.filter((item) => item.Status === "Ocupado").length;
			const livres = response.data.filter((item) => item.Status === "Livre").length;
			const manutencao = response.data.filter((item) => item.Status === "Manutenção").length;
			setOcupados(ocupados)
			setLivres(livres)
			setManutencao(manutencao)
		} catch (error) {
			errorHandler(error);
		} finally {
			setLoading(false);
		}
	}

	async function listSetores(idSetor?: string) {
		try {
			const params = {
				nome: "",
				idSetor: idSetor,
				status: undefined,
				ativo: true
			}
			const response = await useGetSetores.execute(params)
			setSetores(response.data.map(setor => ({
				id: setor.Id.toString(),
				label: setor.Nome
			})));
		} catch (error) {
			errorHandler(error);
		}
	}


	useEffect(() => {
		setIdSetor(setor.value.Id)
		listSetores();
	}, [])

	useEffect(() => {
		const debounce = setTimeout(() => {
			listLeitos();
		}, 750);

		return () => clearTimeout(debounce);
	}, [idSetor])

	return (
		<LeitoLayout>
			<p className="font-semibold text-xl">Leitos</p>
			<p className="text-slate-300">Gerencie os leitos aqui.</p>
			<div className="flex justify-center mt-4">
				<HeaderCard
					loading={false}
					cards={[
						{
							value: livres,
							label: "Leitos Disponíveis",
						},
						{
							value: ocupados,
							label: "Leitos Ocupados",
						},
						{
							value: manutencao,
							label: "Leitos em Manutenção",
						},
					]}
				/>
			</div>

			<div className="w-full h-full p-8">
				<div className="mb-4">
					{execute(permissionsByModule.ADMIN) &&
						(<FilterPopover
							variant={"default"}
							key={"filter"}
							clickFilter={(e) => {
								if (e.itemsOfSelect && e.itemsOfSelect.length > 0) {
									setIdSetor(Number(e.itemsOfSelect[0].id))
								}
							}}
							style={{
								width: "w-36",
							}}
							contentGroupSelect={[
								{
									defaultValues: idSetor?.toString(),
									label: "Ordenação",
									data: setores,
								},
							]}
						/>)
					}
				</div>

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
					onSend={() => {
						setIsOpenLeitoDialog(false);
						listLeitos();
					}}
				/>
			)}
		</LeitoLayout>
	);
};

export { LeitosPage };
