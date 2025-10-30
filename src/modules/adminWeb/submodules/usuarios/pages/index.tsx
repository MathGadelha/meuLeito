import { DataTable } from "@components/dataTable";
import { ActionButton } from "@components/types/ActionButton";
import { Separator } from "@components/ui/separator";
import { FormCadastro } from "@modules/adminWeb/components/createUserForm";
import { AdminWebLayout } from "@modules/adminWeb/components/layout";
import { UserDialog } from "@modules/adminWeb/components/pacientDialog";
// import { columnsUsuarios } from "@modules/adminWeb/components/pacientTableColumns";
import { Trash2, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { columnsUsuarios } from "../components/usersTableColumns";
import { userData } from "@modules/adminWeb/services/getPessoas/listPessoas.dto";


const UsuariosPage = () => {
    const [isOpenUserDialog, setIsOpenUserDialog] = useState(false);
    const [usuarioSelected, setUsuarioSelected] = useState<userData>(
        {} as userData
    );
    const [usuarios, setUsuarios] = useState<userData[]>([]);

    const actionButton: ActionButton[] = [
        {
            label: "Editar Usuário",
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
            label: "Deletar Usuário",
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


    // async function getPessoas() {
    //     try {
    //         const nome = "";
    //         const response = await ListPessoas.execute(nome);
    //         console.log(response)
    //         setPessoas(response);
    //     } catch (error) {
    //         console.error("Erro ao buscar pessoas:", error);
    //     }
    // }

    useEffect(() => {
        setUsuarios([
        ]);
    }, []);

    return (
        <AdminWebLayout>
            <p className="font-semibold text-xl">Cadastro de pessoas</p>
            <p className="text-slate-300">Gerencie as pessoas aqui.</p>
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

export { UsuariosPage };
