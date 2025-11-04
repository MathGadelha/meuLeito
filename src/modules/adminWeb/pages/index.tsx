import { Separator } from "@components/ui/separator";
import { FormCadastro } from "../components/createUserForm";
import { AdminWebLayout } from "../components/layout";
import { DataTable } from "@components/dataTable";
import { columnsPacientes } from "../components/pacientTableColumns";
import { Search, UserRoundPen } from "lucide-react";
import { ActionButton } from "@components/types/ActionButton";
import { useEffect, useState } from "react";
import { ListPacientes } from "../services/listPacientes/listPacientes.service";
import { userData } from "../services/listPacientes/listPacientes.dto";
import { PacienteDialog } from "../components/pacientDialog";
import { Input } from "@components/ui/input";


const AdministradorPage = () => {
	const [isOpenUserDialog, setIsOpenUserDialog] = useState(false);
	const [usuarioSelected, setUsuarioSelected] = useState<userData>(
		{} as userData
	);
	const [pacientes, setPacientes] = useState<userData[]>([]);
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const actionButton: ActionButton[] = [
		{
			label: "Editar paciente",
			icon: <UserRoundPen size={20} />,
			onClick: (row: userData) => {
				setIsOpenUserDialog(true);
				setUsuarioSelected(row);
			},
		},
	];


	async function getPacientes() {
		try {
			setLoading(true);
			const response = await ListPacientes.execute(search || "");
			setPacientes(response.data);
		} catch (error) {
			console.error("Erro ao buscar pessoas:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getPacientes();
	}, []);

	useEffect(() => {
		const debounce = setTimeout(() => {
			getPacientes();
		}, 750);

		return () => clearTimeout(debounce);
	},[search])

	return (
		<AdminWebLayout>
			<p className="font-semibold text-xl">Cadastro de pacientes</p>
			<p className="text-slate-300">Gerencie os pacientes aqui.</p>
			<FormCadastro onSuccess={() => getPacientes()} />
			<Separator />
			<div className="w-full h-full p-8">
				<div className="w-1/3 my-4 flex items-center gap-2 border rounded-lg">
					<Search size={20} className="ml-4" />
					<Input
						className="w-full  border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
						onChange={(e) => {
							setSearch(e.target.value)
						}}
						placeholder="Pesquise um paciente por nome"
					/>
				</div>
				<DataTable
					actionButtons={actionButton}
					columns={columnsPacientes}
					data={pacientes}
					isLoading={loading}
				/>
			</div>

			{isOpenUserDialog && (
				<PacienteDialog
					isOpen={isOpenUserDialog}
					onOpenChange={() => setIsOpenUserDialog(false)}
					pacienteSelected={usuarioSelected}
					onSend={() => { getPacientes(); setIsOpenUserDialog(false); }}
				/>
			)}
		</AdminWebLayout>
	);
};

export { AdministradorPage };
