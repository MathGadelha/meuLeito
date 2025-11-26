import { AdminWebLayout } from "@modules/adminWeb/components/layout";
import { useEffect, useState } from "react";
import { useVisaoGeral } from "../services/visaoGera/visaoGeral.service";
import { HeaderCard } from "@modules/leitos/components/headerCard";
import { errorHandler } from "@api/errorHandler";
import { visaoOutput } from "../services/visaoGera/visaoGeral.dto";
import { FilterPopover } from "@components/filter/Filter";
import { useGetSetores } from "../../setores/services/getSetores/getSetores.service";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { FilterOptions } from "@shared/types/filterOptions";
import { DataTable } from "@components/dataTable";
import { ActionButton } from "@components/types/ActionButton";
import { columnsChamados } from "../components/chamadosTableColumns";
import { chamadosData } from "../types/chamados.dto";
import { useChamadosEnfermeiros } from "../services/getChamadosEnfermeiros/getChamadosEnfermeiros.service";
import { usePagination } from "@shared/hooks/pagination/usePagination";
import { TiThMenu } from "react-icons/ti";
import { ChamadoSheet } from "../components/sheetChamado";
import { Pagination } from "@components/dataTable/pagination";

const IndicadorProfissionalPage = () => {

    const [dados, setDados] = useState<visaoOutput>({} as visaoOutput)
    const [idSetor, setIdSetor] = useState<number>();
    const [setores, setSetores] = useState<FilterOptions[]>([]);
    const [chamados, setChamados] = useState<chamadosData[]>([])
    const [loading, setLoading] = useState(false)
    const [openSheetChamado, setOpenSheetChamado] = useState(false)
    const { pageInfo, handleNextPage, handlePreviousPage } = usePagination()
    const [chamadoSelected, setChamadoSelect] = useState<chamadosData>({} as chamadosData)

    const dadosTeste = [
        { status: "Abertos", qtd: dados.pendentes },
        { status: "Em atendimento", qtd: dados.aceitos },
        { status: "Concluídos", qtd: dados.concluidos },
        { status: "Cancelados", qtd: dados.cancelados },
    ];
    const actionButton: ActionButton[] = [
        {
            label: "Editar profissional",
            icon: <TiThMenu size={20} />,
            onClick: (row: chamadosData) => {
                // setIsOpenUserDialog(true);
                // setProfissionalSeleted(row);
                setOpenSheetChamado(true)
                setChamadoSelect(row)
            },
        },
    ];


    async function getVisaoGeral() {
        try {
            const params = {
                id_setor: idSetor?.toString()
            }
            const result = await useVisaoGeral.execute(params)
            setDados(result)
        } catch (error) {
            errorHandler(error)
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

    async function getChamadosEnfermeiros() {
        try {
            setLoading(true)
            const params = {
                page: pageInfo.value.page,
                pageSize: 10
            }
            const result = await useChamadosEnfermeiros.execute(params)
            setChamados(result.data)
        } catch (error) {
            errorHandler(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const debounce = setTimeout(() => {
            getVisaoGeral();
        }, 750);

        return () => clearTimeout(debounce);
    }, [idSetor, pageInfo.value.page])

    useEffect(() => {
        getVisaoGeral()
        listSetores()
        getChamadosEnfermeiros()
    }, [])

    return (
        <AdminWebLayout>
            <p className="font-semibold text-xl">Acompanhamento de profissionais</p>
            <p className="text-slate-300">Acompanhe o desempenho dos profissionais aqui.</p>
            <div className="w-full flex justify-center my-4">
                <HeaderCard
                    loading={false}
                    cards={[
                        {
                            value: dados.total_chamados,
                            label: "Total de chamados",
                        },
                        {
                            value: dados.aceitos,
                            label: "Chamados aceitos",
                        },
                        {
                            value: dados.pendentes,
                            label: "Chamados pendentes",
                        },
                    ]}
                />
            </div>
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
            <section className="flex justify-center items-center grid grid-cols-1 lg:grid-cols-2 gap-6 my-5">
                <div className="rounded-2xl border border-slate-800 p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Chamados por status
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer className="bg-white" width="100%" height="100%">
                            <BarChart data={dadosTeste} >
                                <XAxis dataKey="status" stroke="#1e293b" />
                                <YAxis stroke="#1e293b" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#FFF",
                                        border: "1px solid #1e293b",
                                        borderRadius: 8,
                                        color: "#1e293b",
                                    }}
                                />
                                <Bar dataKey="qtd" fill="#136f63" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-800 p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Chamados por enfermeiro
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer className="bg-white" width="100%" height="100%">
                            <BarChart data={dadosTeste} >
                                <XAxis dataKey="status" stroke="#1e293b" />
                                <YAxis stroke="#1e293b" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#FFF",
                                        border: "1px solid #1e293b",
                                        borderRadius: 8,
                                        color: "#1e293b",
                                    }}
                                />
                                <Bar dataKey="qtd" fill="#136f63" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
            <div className="flex flex-col p-4 gap-4">
                <p className="font-semibold text-xl">Lista de chamados</p>
                <DataTable
                    actions={actionButton}
                    columns={columnsChamados}
                    data={chamados}
                    isLoading={loading}
                />
                <Pagination handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
            </div>
            {openSheetChamado &&
                <ChamadoSheet isOpen={openSheetChamado} onOpenChange={() => setOpenSheetChamado(false)} chamadoSelected={chamadoSelected} />
            }
        </AdminWebLayout>
    );
};

export { IndicadorProfissionalPage };
