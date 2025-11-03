import { Separator } from "@components/ui/separator";
import { DataTable } from "@components/dataTable";
import { Search, Trash2, UserRoundPen } from "lucide-react";
import { ActionButton } from "@components/types/ActionButton";
import { useEffect, useState } from "react";
import { AdminWebLayout } from "@modules/adminWeb/components/layout";
import { FormCadastro } from "../components/createUserForm";
import { ProfissionalDialog } from "../components/profissionalDialog";
import { columnsProfissionais } from "../components/profissionaisTableColumns";
import { userData } from "../services/listProfissionais/listProfissionais.dto";
import { ListProfissionais } from "../services/listProfissionais/listProfissionais.service";
import { Input } from "@components/ui/input";


const ProfissionaisPage = () => {
	const [isOpenUserDialog, setIsOpenUserDialog] = useState(false);

	const [profissionais, setProfissionais] = useState<userData[]>([]);
	const [profissionalSeleted, setProfissionalSeleted] = useState<userData>({} as userData);
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const actionButton: ActionButton[] = [
		{
			label: "Editar paciente",
			icon: <UserRoundPen size={20} />,
			onClick: (row: userData) => {
				setIsOpenUserDialog(true);
				setProfissionalSeleted(row);
			},
		},
	];


	async function getProfissionais() {
		try {
			setLoading(true);
			const response = await ListProfissionais.execute(search || "");
			console.log(response)
			setProfissionais(response.data);
		} catch (error) {
			console.error("Erro ao buscar pessoas:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getProfissionais();
	}, []);

	useEffect(() => {
		const debounce = setTimeout(() => {
			getProfissionais();
		}, 750);

		return () => clearTimeout(debounce);
	}, [search]);

	return (
		<AdminWebLayout>
			<p className="font-semibold text-xl">Cadastro de profissionais</p>
			<p className="text-slate-300">Gerencie os profissionais aqui.</p>
			<FormCadastro onSuccess={() => getProfissionais()} />
			<Separator />
			<div className="w-full h-full p-8">
				<div className="w-1/3 my-4 flex items-center gap-2 border rounded-lg">
					<Search size={20} className="ml-4" />
					<Input
						className="w-full  border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						placeholder="Pesquise um paciente por nome"
					/>
				</div>
				<DataTable
					actionButtons={actionButton}
					columns={columnsProfissionais}
					data={profissionais}
					isLoading={loading}
				/>
			</div>
			{isOpenUserDialog && (
				<ProfissionalDialog
					isOpen={isOpenUserDialog}
					onOpenChange={() => setIsOpenUserDialog(false)}
					profissionalSelected={profissionalSeleted}
					onSend={() => { getProfissionais(); setIsOpenUserDialog(false); }}
				/>
			)}
		</AdminWebLayout>
	);
};

export { ProfissionaisPage };
