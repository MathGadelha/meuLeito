import { Separator } from "@components/ui/separator";
import { FormCadastro } from "../components/createUserForm";
import { AdminWebLayout } from "../components/layout";
import { DataTable } from "@components/dataTable";
import { columnsPacientes } from "../components/pacientTableColumns";
import { Trash2, UserRoundPen } from "lucide-react";
import { ActionButton } from "@components/types/ActionButton";
import { useEffect, useState } from "react";
import { ListPacientes } from "../services/listPacientes/listPacientes.service";
import { userData } from "../services/listPacientes/listPacientes.dto";
import { PacienteDialog } from "../components/pacientDialog";


const AdministradorPage = () => {
	const [isOpenUserDialog, setIsOpenUserDialog] = useState(false);
	const [usuarioSelected, setUsuarioSelected] = useState<userData>(
		{} as userData
	);
	const [pacientes, setPacientes] = useState<userData[]>([]);

	const actionButton: ActionButton[] = [
		{
			label: "Editar paciente",
			icon: <UserRoundPen size={20} />,
			onClick: (row: userData) => {
				setIsOpenUserDialog(true);
				setUsuarioSelected(row);
				// localStorage.setItem(
				// 	"@farmacias-selected-people",
				// 	JSON.stringify({ ...row, convenio: convenio[0], nomeConvenio: convenio[1] })
				// );
				// navigate('/farmacias/selecao-beneficiario/triagem')
			},
		},
		{
			label: "Deletar paciente",
			icon: <Trash2 size={20} color="red" />,
			onClick: (row: userData) => {
				setUsuarioSelected(row);
				// localStorage.setItem(
				// 	"@farmacias-selected-people",
				// 	JSON.stringify({ ...row, convenio: convenio[0], nomeConvenio: convenio[1] })
				// );
				// navigate('/farmacias/selecao-beneficiario/triagem')
			},
		},
	];


	async function getPacientes() {
		try {
			const nome = "";
			const response = await ListPacientes.execute(nome);
			console.log(response)
			setPacientes(response.data);
		} catch (error) {
			console.error("Erro ao buscar pessoas:", error);
		}
	}

	useEffect(() => {
		getPacientes();
	}, []);

	return (
		<AdminWebLayout>
			<p className="font-semibold text-xl">Cadastro de pacientes</p>
			<p className="text-slate-300">Gerencie os pacientes aqui.</p>
			<FormCadastro />
			<Separator />
			<div className="w-full h-full p-8">
				<DataTable
					actionButtons={actionButton}
					columns={columnsPacientes}
					data={pacientes}
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
