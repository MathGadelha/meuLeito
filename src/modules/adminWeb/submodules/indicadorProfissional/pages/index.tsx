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
import { useChamadosIntervalo } from "../services/getChamadosIntervalo/getChamadosIntervalo.service";
import { chamadosIntervaloOutPut } from "../services/getChamadosIntervalo/getChamadosIntervalo.dto";
import { useChamadosTipo } from "../services/getChamadosTipo/getChamadosTipo.service";
import { chamadosTipoOutPut } from "../services/getChamadosTipo/getChamadosTipo.dto";
import { chamadosSetorOutPut } from "../services/getChamadosSetor/getChamadosSetor.dto";
import { useChamadosSetor } from "../services/getChamadosSetor/getChamadosSetor.service";
import { useChamadosEnfermeiros } from "../services/getChamadosEnfermeiros/getChamadosEnfermeiros.service";
import { chamadosData } from "../types/chamados.dto";
import { DataTable } from "@components/dataTable";
import { columnsChamados } from "../components/chamadosTableColumns";
import { Pagination } from "@components/dataTable/pagination";
import { usePagination } from "@shared/hooks/pagination/usePagination";
import { Button } from "@components/ui/button";

const IndicadorProfissionalPage = () => {
    const [dados, setDados] = useState<visaoOutput>({} as visaoOutput);
    const [idSetor, setIdSetor] = useState<number>();
    const [setores, setSetores] = useState<FilterOptions[]>([]);
    const [dadosSetor, setDadosSetor] = useState<chamadosSetorOutPut[]>([]);
    const [dadosIntervalo, setDadosIntervalo] = useState<chamadosIntervaloOutPut[]>([]);
    const [dadosTipo, setDadosTipo] = useState<chamadosTipoOutPut[]>([]);
    const [chamados, setChamados] = useState<chamadosData[]>([]);
    const { pageInfo, handleNextPage, handlePreviousPage } = usePagination();

    // --- loading individuais, um por requisição ---
    const [loadingVisaoGeral, setLoadingVisaoGeral] = useState(false);
    const [loadingSetor, setLoadingSetor] = useState(false);
    const [loadingIntervalo, setLoadingIntervalo] = useState(false);
    const [loadingTipo, setLoadingTipo] = useState(false);
    const [loadingChamados, setLoadingChamados] = useState(false);
    const [loadingSetores, setLoadingSetores] = useState(false);

    async function getVisaoGeral() {
        try {
            setLoadingVisaoGeral(true);
            const params = {
                id_setor: idSetor?.toString(),
            };
            const result = await useVisaoGeral.execute(params);
            setDados(result);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoadingVisaoGeral(false);
        }
    }

    async function getChamadosSetor() {
        try {
            setLoadingSetor(true);
            const params = {
                init: undefined,
                fim: undefined,
                id_setor: idSetor!, // se o seu backend aceita undefined, pode tirar o "!"
            };
            const result = await useChamadosSetor.execute(params);
            setDadosSetor(result);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoadingSetor(false);
        }
    }

    async function getChamadosIntervalo() {
        try {
            setLoadingIntervalo(true);
            const params = {
                init: undefined,
                fim: undefined,
                id_setor: idSetor!,
            };
            const result = await useChamadosIntervalo.execute(params);
            setDadosIntervalo(result);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoadingIntervalo(false);
        }
    }

    async function getChamadosTipo() {
        try {
            setLoadingTipo(true);
            const params = {
                init: undefined,
                fim: undefined,
                id_setor: idSetor!,
            };
            const result = await useChamadosTipo.execute(params);
            setDadosTipo(result);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoadingTipo(false);
        }
    }

    async function listSetores(idSetorParam?: string) {
        try {
            setLoadingSetores(true);
            const params = {
                nome: "",
                idSetor: idSetorParam,
                status: undefined,
                ativo: true,
            };
            const response = await useGetSetores.execute(params);
            setSetores(
                response.data.map((setor) => ({
                    id: setor.Id.toString(),
                    label: setor.Nome,
                }))
            );
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoadingSetores(false);
        }
    }

    async function getChamadosEnfermeiros() {
        try {
            setLoadingChamados(true);
            const params = {
                page: pageInfo.value.page,
                pageSize: 10,
            };
            const result = await useChamadosEnfermeiros.execute(params);
            pageInfo.set((prev) => ({
                ...prev,
                perPage: result.pageSize,
                total: result.total,
            }));
            setChamados(result.data);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoadingChamados(false);
        }
    }

    useEffect(() => {
        // primeira carga
        getVisaoGeral();
        listSetores();
        getChamadosSetor();
        getChamadosEnfermeiros();
        getChamadosIntervalo();
        getChamadosTipo();
    }, []);

    useEffect(() => {
        // sempre que trocar o setor, refaz as requisições relacionadas ao setor
        if (!idSetor) return;
        getVisaoGeral();
        getChamadosSetor();
        getChamadosIntervalo();
        getChamadosTipo();
    }, [idSetor]);

    useEffect(() => {
        // paginação da tabela
        getChamadosEnfermeiros();
    }, [pageInfo.value.page]);

    return (
        <AdminWebLayout>
            <p className="font-semibold text-xl">Acompanhamento de profissionais</p>
            <p className="text-slate-300">Acompanhe o desempenho dos profissionais aqui.</p>

            {/* Cards de visão geral com loading da requisição useVisaoGeral */}
            <div className="w-full flex justify-center my-4">
                <HeaderCard
                    loading={loadingVisaoGeral}
                    cards={[
                        { value: dados.total_chamados, label: "Total de chamados" },
                        { value: dados.aceitos, label: "Chamados aceitos" },
                        { value: dados.pendentes, label: "Chamados pendentes" },
                        { value: dados.concluidos, label: "Chamados concluídos" },
                        { value: dados.cancelados, label: "Chamados cancelados" },
                    ]}
                />
            </div>

            <div className="flex flex-row items-center gap-4">
                <FilterPopover
                    variant={"default"}
                    key={"filter"}
                    clickFilter={(e) => {
                        if (e.itemsOfSelect && e.itemsOfSelect.length > 0) {
                            setIdSetor(Number(e.itemsOfSelect[0].id));
                        }
                    }}
                    style={{
                        width: "w-36",
                    }}
                    contentGroupSelect={[
                        {
                            defaultValues: idSetor?.toString(),
                            label: "Setor",
                            data: setores,
                        },
                    ]}
                />
                {idSetor && (
                    <Button
                        className="w-20 h-10 rounded-xl"
                        onClick={() => setIdSetor(undefined)}
                    >
                        Limpar filtros
                    </Button>
                )}
                {loadingSetores && (
                    <span className="text-xs text-slate-400">Carregando setores...</span>
                )}
            </div>

            {/* Chamados por setor – loading amarrado ao getChamadosSetor */}
            <section className="w-full flex justify-center items-center my-5">
                <div className="w-full rounded-2xl border border-slate-800 p-4">
                    <h2 className="text-lg font-semibold mb-4">Chamados por setor</h2>
                    <div className="w-full h-64">
                        {loadingSetor ? (
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-gray-600 text-sm">
                                    Carregando gráfico de setor...
                                </p>
                            </div>
                        ) : (
                            <ResponsiveContainer className="bg-white" width="100%" height="100%">
                                <BarChart data={dadosSetor}>
                                    <XAxis dataKey="nome_setor" stroke="#1e293b" />
                                    <YAxis stroke="#1e293b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#FFF",
                                            border: "1px solid #1e293b",
                                            borderRadius: 8,
                                            color: "#1e293b",
                                        }}
                                    />
                                    <Bar dataKey="total" fill="#136f63" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </section>

            {/* Chamados por intervalo e por tipo – cada um com seu loading */}
            <section className="flex justify-center items-center grid grid-cols-1 lg:grid-cols-2 gap-6 my-5">
                {/* Intervalo */}
                <div className="rounded-2xl border border-slate-800 p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Chamados por intervalo de tempo
                    </h2>
                    <div className="h-64">
                        {loadingIntervalo ? (
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-gray-600 text-sm">
                                    Carregando gráfico de intervalos...
                                </p>
                            </div>
                        ) : (
                            <ResponsiveContainer className="bg-white" width="100%" height="100%">
                                <BarChart data={dadosIntervalo}>
                                    <XAxis dataKey="label" stroke="#1e293b" />
                                    <YAxis stroke="#1e293b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#FFF",
                                            border: "1px solid #1e293b",
                                            borderRadius: 8,
                                            color: "#1e293b",
                                        }}
                                    />
                                    <Bar dataKey="total" fill="#136f63" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Tipo */}
                <div className="rounded-2xl border border-slate-800 p-4">
                    <h2 className="text-lg font-semibold mb-4">Chamados por tipo</h2>
                    <div className="h-64">
                        {loadingTipo ? (
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-gray-600 text-sm">
                                    Carregando gráfico de tipos...
                                </p>
                            </div>
                        ) : (
                            <ResponsiveContainer className="bg-white" width="100%" height="100%">
                                <BarChart data={dadosTipo}>
                                    <XAxis dataKey="tipo" stroke="#1e293b" />
                                    <YAxis stroke="#1e293b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#FFF",
                                            border: "1px solid #1e293b",
                                            borderRadius: 8,
                                            color: "#1e293b",
                                        }}
                                    />
                                    <Bar dataKey="total" fill="#136f63" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </section>

            {/* Tabela – loading amarrado ao getChamadosEnfermeiros */}
            <div className="mt-6">
                {loadingChamados ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-gray-600 text-sm">
                            Carregando chamados...
                        </p>
                    </div>
                ) : (
                    <>
                        <DataTable columns={columnsChamados} data={chamados} />
                        <Pagination
                            pageInfo={pageInfo.value}
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                        />
                    </>
                )}
            </div>
        </AdminWebLayout>
    );
};

export { IndicadorProfissionalPage };
