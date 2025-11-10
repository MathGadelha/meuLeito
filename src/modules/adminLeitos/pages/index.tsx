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
import { Button } from "@components/ui/button";
import { FaPlus } from "react-icons/fa";

const LeitosAdminPage = () => {
    const [isOpenLeitoDialog, setIsOpenLeitoDialog] = useState(false);
    const [leitoSelected, setLeitoSelected] = useState<leitosAdmin>(
        {} as leitosAdmin
    );
    const [leitos, setLeitos] = useState<leitosAdmin[]>([]);
    const [tipo, setTipo] = useState<"C" | "E">("C");
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    async function listLeitos(search?: string) {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    const actionButton: ActionButton[] = [
        {
            label: "Selecionar Leito",
            icon: <ExternalLink size={20} />,
            onClick: (row: leitosAdmin) => {
                setLeitoSelected(row);
                setIsOpenLeitoDialog(true);
                setTipo("E");
            },
        },
    ];

    useEffect(() => {
        listLeitos();
    }, [])

    useEffect(() => {
        const debounce = setTimeout(() => {
            listLeitos(search);
        }, 750);

        return () => clearTimeout(debounce);
    }, [search]);

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
            <div className="flex flex-row items-center justify-between mt-8 mx-8">
                <div className="w-1/4 flex items-center gap-2 border rounded-lg">
                    <Search size={20} className="ml-4" />
                    <Input
                        className="w-full  border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        placeholder="Pesquise por um leito"
                    />
                </div>
                <Button className="bg-primary gap-2" onClick={() => {
                    setTipo("C");
                    setLeitoSelected({} as leitosAdmin);
                    setIsOpenLeitoDialog(true);
                }}>
                    <FaPlus />Criar Leito
                </Button>
            </div>
            <div className="w-full h-full p-8">
                <DataTable
                    actions={actionButton}
                    columns={columnsLeitosAdmin}
                    data={leitos}
                    isLoading={loading}
                />
            </div>
            {isOpenLeitoDialog && (
                <LeitoDialogAdmin
                    isOpen={isOpenLeitoDialog}
                    onOpenChange={() => setIsOpenLeitoDialog(false)}
                    leitoSelected={leitoSelected}
                    tipo={tipo}
                    onSend={() => { listLeitos(); setIsOpenLeitoDialog(false); }}
                />
            )}
        </LeitoAdminLayout>
    );
};

export { LeitosAdminPage };
