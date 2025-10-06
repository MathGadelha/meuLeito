import { DataTable } from "@components/dataTable";
import { AdminWebLayout } from "@modules/adminWeb/components/layout";
import { pacientes } from "../mocks/pacientes";
import { columnsPacientes } from "../components/pacientesTableColumns";
import { UserRoundPen } from "lucide-react";
import { ActionButton } from "@components/types/ActionButton";


const RotinasPage = () => {

    const actionButton: ActionButton[] = [
        {
            label: "Editar Rotina",
            icon: <UserRoundPen size={20} />,
            onClick: (row: any) => {

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
            <p className="font-semibold text-xl">Acompanhamento de profissionais</p>
            <p className="text-slate-300">Acompanhe o desempenho dos profissionais aqui.</p>
            <div>
                <DataTable
                    actionButtons={actionButton}
                    columns={columnsPacientes}
                    data={pacientes}
                />
            </div>

        </AdminWebLayout>
    );
};

export { RotinasPage };
