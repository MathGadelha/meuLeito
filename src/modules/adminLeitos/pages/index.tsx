import { useEffect, useState } from "react";
import { DataTable } from "@components/dataTable";
import { ActionButton } from "@components/types/ActionButton";
import { ExternalLink, Search } from "lucide-react";
import { LeitoAdminLayout } from "../components/layout";
import { HeaderAdminCard } from "../components/headerCard";
import { indicadores } from "@modules/leitos/mocks/leitos";
import { columnsLeitosAdmin } from "../components/leitosAdminTableColumns";
import { useGetLeitos } from "../services/getLeitos/getLeitos.service";
import { leitosAdmin } from "../services/getLeitos/getLeitos.dto";
import { errorHandler } from "@api/errorHandler";
import { LeitoDialogAdmin } from "../components/leitoDialog";
import { Input } from "@components/ui/input";

const LeitosAdminPage = () => {
    const [isOpenLeitoDialog, setIsOpenLeitoDialog] = useState(false);
    const [leitoSelected, setLeitoSelected] = useState<leitosAdmin>(
        {} as leitosAdmin
    );
    const [leitos, setLeitos] = useState<leitosAdmin[]>([]);

    async function listLeitos(search?: string) {
        try {
            const params = {
                nome: search,
                idSetor: undefined,
                status: undefined,
                ativo: undefined
            }
            const response = await useGetLeitos.execute(params)
            setLeitos(response.data);
        } catch (error) {
            errorHandler(error);
        }
    }

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

    useEffect(() => {
        listLeitos();
    }, [])

    return (
        <LeitoAdminLayout>
            <p className="font-semibold text-xl">Leitos</p>
            <p className="text-slate-300">Gerencie os leitos aqui.</p>
            <div className="flex justify-center">
                <HeaderAdminCard
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
            <div className="flex items-center gap-2 mt-8 mx-8 border rounded-lg w-1/4">
                <Search size={20} className="ml-4" />
                <Input
                    className="w-full  border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                    onChange={(e) => {
                        const debounce = setTimeout(() => {
                            listLeitos(e.target.value);
                        }, 750);

                        return () => clearTimeout(debounce);
                    }}
                    placeholder="Pesquise uma pessoa por nome"
                />
            </div>
            <div className="w-full h-full p-8">
                <DataTable
                    actions={actionButton}
                    columns={columnsLeitosAdmin}
                    data={leitos}
                />
            </div>
            {isOpenLeitoDialog && (
                <LeitoDialogAdmin
                    isOpen={isOpenLeitoDialog}
                    onOpenChange={() => setIsOpenLeitoDialog(false)}
                    leitoSelected={leitoSelected}
                />
            )}
        </LeitoAdminLayout>
    );
};

export { LeitosAdminPage };
