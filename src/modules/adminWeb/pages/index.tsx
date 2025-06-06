import { Separator } from "@components/ui/separator";
import { FormCadastro } from "../components/createUserForm";
import { AdminWebLayout } from "../components/layout";
import { usuarios } from "../mocks/usuarios";
import { DataTable } from "@components/dataTable";
import { columnsUsuarios } from "../components/usersTableColumns";
import { usuariosData } from "../types/usuarios.dto";
import { Trash2, UserRoundPen } from "lucide-react";
import { ActionButton } from "@components/types/ActionButton";
import { useState } from "react";
import { UserDialog } from "../components/userDialog";

const AdministradorPage = () => {
	const [isOpenUserDialog, setIsOpenUserDialog] = useState(false);
	const [usuarioSelected, setUsuarioSelected] = useState<usuariosData>(
		{} as usuariosData
	);

	const actionButton: ActionButton[] = [
		{
			label: "Editar Usuário",
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
			label: "Deletar Usuário",
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

	return (
		<AdminWebLayout>
			<p className="font-semibold text-xl">Cadastro de usuários</p>
			<p className="text-slate-300">Gerencie os usuários aqui.</p>
			<FormCadastro />
			<Separator />
			<div className="w-full h-full p-8">
				<DataTable
					actionButtons={actionButton}
					columns={columnsUsuarios}
					data={usuarios}
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
