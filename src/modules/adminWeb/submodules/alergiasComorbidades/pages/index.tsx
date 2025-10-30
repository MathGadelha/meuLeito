import { DataTable } from "@components/dataTable";
import { AdminWebLayout } from "@modules/adminWeb/components/layout";
import { Search } from "lucide-react";
import { ActionButton } from "@components/types/ActionButton";
import { useEffect, useState } from "react";
import { errorHandler } from "@api/errorHandler";
import { Input } from "@components/ui/input";
import { RiEdit2Fill } from "react-icons/ri";
import { columnsSetores } from "../../setores/components/setoresTableColumns";
import { AlergiasDialog } from "../components/alergiasDialog";
import { alergiasData } from "../services/getAlergias/getAlergias.dto";
import { comorbidadesData } from "../services/getComorbidades/getComorbidades.dto";
import { ComorbidadesDialog } from "../components/comorbidadesDialog";
import { Button } from "@components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useGetAlergias } from "../services/getAlergias/getAlergias.service";
import { useGetComorbidades } from "../services/getComorbidades/getComorbidades.service";


const AlergiasComorbidadesPage = () => {

    const [openAlergiaDialog, setOpenAlergiaDialog] = useState(false);
    const [openComorbidadeDialog, setOpenComorbidadeDialog] = useState(false);
    const [tipoAlergia, setTipoAlergia] = useState<"C" | "E">("C");
    const [tipoComorbidade, setTipoComorbidade] = useState<"C" | "E">("C");
    const [AlergiaSelected, setAlergiaSelected] = useState<alergiasData>();
    const [ComorbidadeSelected, setComorbidadeSelected] = useState<comorbidadesData>();
    const [loading, setLoading] = useState(false);
    const [alergias, setAlergias] = useState<alergiasData[]>([]);
    const [comorbidades, setComorbidades] = useState<comorbidadesData[]>([]);


    const actionButtonAlergia: ActionButton[] = [
        {
            label: "Editar Alergia",
            icon: <RiEdit2Fill size={20} />,
            onClick: (row: alergiasData) => {
                console.log(row);
                setAlergiaSelected(row);
                setOpenAlergiaDialog(true);
                setTipoAlergia("E");
            },
        },
    ];

    const actionButtonComorbidade: ActionButton[] = [
        {
            label: "Editar Comorbidade",
            icon: <RiEdit2Fill size={20} />,
            onClick: (row: comorbidadesData) => {
                console.log(row);
                setComorbidadeSelected(row);
                setOpenComorbidadeDialog(true);
                setTipoComorbidade("E");
            },
        },
    ];

    async function listAlergias(search?: string) {
        try {
            setLoading(true);
            const params = {
                nome: search,
            }
            const result = await useGetAlergias.execute(params);
            setAlergias(result.data);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoading(false);
        }
    }

    async function listComorbidades(search?: string) {
        try {
            setLoading(true);
            const params = {
                nome: search,
            }
            const result = await useGetComorbidades.execute(params);
            setComorbidades(result.data);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        listAlergias();
        listComorbidades();
    }, [])

    return (
        <AdminWebLayout>
            <p className="font-semibold text-xl">Gerenciamento de Alergias e Comorbidades</p>
            <p className="text-slate-300">Gerencie as alergias e comorbidades aqui.</p>
            <div className="flex flex-row w-full gap-4 mt-4">
                <div className="w-1/2">
                    <p className="font-bold">Alergias</p>
                    <div className="flex flex-row justify-between">
                        <div className="flex items-center gap-2 mb-4 border rounded-lg w-1/4">
                            <Search size={20} className="ml-4" />
                            <Input
                                className="w-full  border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                                onChange={(e) => {
                                    const debounce = setTimeout(() => {
                                        listAlergias(e.target.value);
                                    }, 750);

                                    return () => clearTimeout(debounce);
                                }}
                                placeholder="Pesquise uma pessoa por nome"
                            />
                        </div>
                        <Button className="bg-primary gap-2" onClick={() => {
                            setTipoAlergia("C");
                            setAlergiaSelected(undefined);
                            setOpenAlergiaDialog(true);
                        }}>
                            <FaPlus />Adicionar Alergia
                        </Button>
                    </div>
                    <DataTable
                        actions={actionButtonAlergia}
                        columns={columnsSetores}
                        data={alergias}
                        isLoading={loading}
                    />
                </div>
                <div className="w-1/2">
                    <p className="font-bold">Comorbidades</p>
                    <div className="flex flex-row justify-between">
                        <div className="flex items-center gap-2 mb-4 border rounded-lg w-1/4">
                            <Search size={20} className="ml-4" />
                            <Input
                                className="w-full  border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                                onChange={(e) => {
                                    const debounce = setTimeout(() => {
                                        listComorbidades(e.target.value);
                                    }, 750);

                                    return () => clearTimeout(debounce);
                                }}
                                placeholder="Pesquise uma pessoa por nome"
                            />
                        </div>
                        <Button className="bg-primary gap-2" onClick={() => {
                            setTipoComorbidade("C");
                            setComorbidadeSelected(undefined);
                            setOpenComorbidadeDialog(true);
                        }}>
                            <FaPlus />Adicionar Comorbidade
                        </Button>
                    </div>
                    <DataTable
                        actions={actionButtonComorbidade}
                        columns={columnsSetores}
                        data={comorbidades}
                        isLoading={loading}
                    />
                </div>
            </div>
            {openAlergiaDialog && <AlergiasDialog isOpen={openAlergiaDialog} onOpenChange={setOpenAlergiaDialog} tipo={tipoAlergia} AlergiaSelected={AlergiaSelected} onSend={() => { listAlergias(); setOpenAlergiaDialog(false); }} />}
            {openComorbidadeDialog && <ComorbidadesDialog isOpen={openComorbidadeDialog} onOpenChange={setOpenComorbidadeDialog} tipo={tipoComorbidade} comorbidadeSelected={ComorbidadeSelected} onSend={() => { listComorbidades(); setOpenComorbidadeDialog(false); }} />}
        </AdminWebLayout>
    );
};

export { AlergiasComorbidadesPage };
