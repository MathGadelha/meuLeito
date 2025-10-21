import { Separator } from "@components/ui/separator";
import { FormCadastro } from "../components/createUserForm";
import { AdminWebLayout } from "../components/layout";
import { DataTable } from "@components/dataTable";
import { columnsPacientes } from "../components/pacientTableColumns";
import { usuariosData } from "../types/usuarios.dto";
import { Trash2, UserRoundPen } from "lucide-react";
import { ActionButton } from "@components/types/ActionButton";
import { useEffect, useState } from "react";
import { UserDialog } from "../components/pacientDialog";
import { ListPessoas } from "../services/getPessoas/listPessoas.service";
import { userData } from "../services/getPessoas/listPessoas.dto";

const AdministradorPage = () => {
	const [isOpenUserDialog, setIsOpenUserDialog] = useState(false);
	const [usuarioSelected, setUsuarioSelected] = useState<usuariosData>(
		{} as usuariosData
	);
	const [pacientes, setPacientes] = useState<userData[]>([]);

	const actionButton: ActionButton[] = [
		{
			label: "Editar paciente",
			icon: <UserRoundPen size={20} />,
			onClick: (row: usuariosData) => {
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
			onClick: (row: usuariosData) => {
				setUsuarioSelected(row);
				// localStorage.setItem(
				// 	"@farmacias-selected-people",
				// 	JSON.stringify({ ...row, convenio: convenio[0], nomeConvenio: convenio[1] })
				// );
				// navigate('/farmacias/selecao-beneficiario/triagem')
			},
		},
	];


	async function getPessoas() {
		try {
			const nome = "";
			const response = await ListPessoas.execute(nome);
			console.log(response)
			setPacientes(response.data);
		} catch (error) {
			console.error("Erro ao buscar pessoas:", error);
		}
	}

	useEffect(() => {
		getPessoas();
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
				<UserDialog
					isOpen={isOpenUserDialog}
					onOpenChange={() => setIsOpenUserDialog(false)}
					usuarioSelected={usuarioSelected}
				/>
			)}
		</AdminWebLayout>
	);
};

export { AdministradorPage };
