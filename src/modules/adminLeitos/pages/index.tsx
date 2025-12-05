import { useEffect, useState } from "react";
import { DataTable } from "@components/dataTable";
import { ActionButton } from "@components/types/ActionButton";
import { ExternalLink, Search } from "lucide-react";
import { LeitoAdminLayout } from "../components/layout";
import { HeaderAdminCard } from "../components/headerCard";
import { columnsLeitosAdmin } from "../components/leitosAdminTableColumns";
import { useGetLeitos } from "../services/getLeitos/getLeitos.service";
import { leitosAdmin } from "../services/getLeitos/getLeitos.dto";
import { errorHandler } from "@api/errorHandler";
import { LeitoDialogAdmin } from "../components/leitoDialog";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { FaPlus } from "react-icons/fa";
import { FilterPopover } from "@components/filter/Filter";
import { useGetSetores } from "@modules/adminWeb/submodules/setores/services/getSetores/getSetores.service";
import { FilterOptions } from "@shared/types/filterOptions";

const LeitosAdminPage = () => {
    const [isOpenLeitoDialog, setIsOpenLeitoDialog] = useState(false);
    const [leitoSelected, setLeitoSelected] = useState<leitosAdmin>(
        {} as leitosAdmin
    );
    const [leitos, setLeitos] = useState<leitosAdmin[]>([]);
    const [tipo, setTipo] = useState<"C" | "E">("C");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [setores, setSetores] = useState<FilterOptions[]>([]);
    const [idSetor, setIdSetor] = useState<number>();
    const [ocupados, setOcupados] = useState<number>();
    const [livres, setLivres] = useState<number>();
    const [manutencao, setManutencao] = useState<number>();

    async function listLeitos(search?: string) {
        try {
            setLoading(true);
            const params = {
                nome: search,
                id_setor: idSetor,
                status: undefined,
                ativo: undefined
            }
            const response = await useGetLeitos.execute(params)
            setLeitos(response.data);
            const ocupados = response.data.filter((item) => item.Status === "Ocupado").length;
            const livres = response.data.filter((item) => item.Status === "Livre").length;
            const manutencao = response.data.filter((item) => item.Status === "Manutenção").length;
            setOcupados(ocupados)
            setLivres(livres)
            setManutencao(manutencao)
        } catch (error) {
            errorHandler("Erro ao listar leitos");
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
        listSetores();
    }, [])

    useEffect(() => {
        const debounce = setTimeout(() => {
            listLeitos(search);
        }, 750);

        return () => clearTimeout(debounce);
    }, [search, idSetor]);

    return (
        <LeitoAdminLayout>
            <p className="font-semibold text-xl">Leitos</p>
            <p className="text-slate-300">Gerencie os leitos aqui.</p>
            <div className="flex justify-center">
                <HeaderAdminCard
                    loading={loading}
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
                <div className="flex flex-row gap-4">
                    <FilterPopover
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
                    />
                    <Button className="bg-primary gap-2" onClick={() => {
                        setTipo("C");
                        setLeitoSelected({} as leitosAdmin);
                        setIsOpenLeitoDialog(true);
                    }}>
                        <FaPlus />Criar Leito
                    </Button>
                </div>

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
