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
import dayjs from "dayjs";
import { useChamadosIntervalo } from "../services/getChamadosIntervalo/getChamadosIntervalo.service";
import { chamadosIntervaloOutPut } from "../services/getChamadosIntervalo/getChamadosIntervalo.dto";
import { useChamadosTipo } from "../services/getChamadosTipo/getChamadosTipo.service";
import { chamadosTipoOutPut } from "../services/getChamadosTipo/getChamadosTipo.dto";

const IndicadorProfissionalPage = () => {

    const [dados, setDados] = useState<visaoOutput>({} as visaoOutput)
    const [idSetor, setIdSetor] = useState<number>();
    const [setores, setSetores] = useState<FilterOptions[]>([]);
    // const [loading, setLoading] = useState(false);
    // const [dadosSetor, setDadosSetor] = useState<chamadosSetorOutPut>()
    const [dadosIntervalo, setDadosIntervalo] = useState<chamadosIntervaloOutPut[]>([])
    const [dadosTipo, setDadosTipo] = useState<chamadosTipoOutPut[]>([])

    const dadosTeste = [
        { status: "Abertos", qtd: dados.pendentes },
        { status: "Em atendimento", qtd: dados.aceitos },
        { status: "Concluídos", qtd: dados.concluidos },
        { status: "Cancelados", qtd: dados.cancelados },
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

    // async function getChamadosSetor() {
    //     try {
    //         const params = {
    //             init: dayjs().format("YYYY-MM-DD"),
    //             fim: dayjs().format("YYYY-MM-DD"),
    //             id_setor: idSetor!
    //         }
    //         const result = await useChamadosSetor.execute(params)
    //         setDadosSetor(result)
    //     } catch (error) {
    //         errorHandler(error)
    //     }
    // }

    async function getChamadosIntervalo() {
        try {
            const params = {
                init: dayjs().format("YYYY-MM-DD"),
                fim: dayjs().format("YYYY-MM-DD"),
                id_setor: idSetor!
            }
            const result = await useChamadosIntervalo.execute(params)
            setDadosIntervalo(result)
        } catch (error) {
            errorHandler(error)
        }
    }

    async function getChamadosTipo() {
        try {
            const params = {
                init: dayjs().format("YYYY-MM-DD"),
                fim: dayjs().format("YYYY-MM-DD"),
                id_setor: idSetor!
            }
            const result = await useChamadosTipo.execute(params)
            setDadosTipo(result)
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

    // async function getChamadosEnfermeiros() {
    //     try {
    //         setLoading(true)
    //         const params = {
    //             page: pageInfo.value.page,
    //             pageSize: 10
    //         }
    //         const result = await useChamadosEnfermeiros.execute(params)
    //         setChamados(result.data)
    //     } catch (error) {
    //         errorHandler(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }


    useEffect(() => {
        const debounce = setTimeout(() => {
            getVisaoGeral();
        }, 750);

        return () => clearTimeout(debounce);
    }, [idSetor])

    useEffect(() => {
        getVisaoGeral()
        listSetores()
        // getChamadosSetor()
        getChamadosIntervalo()
        getChamadosTipo()
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
                        {
                            value: dados.concluidos,
                            label: "Chamados concluídos",
                        },
                        {
                            value: dados.cancelados,
                            label: "Chamados cancelados",
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
            <section className="w-full flex justify-center items-center my-5">
                <div className="w-full rounded-2xl border border-slate-800 p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Chamados por setor
                    </h2>
                    <div className="w-full h-64">
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
            <section className="flex justify-center items-center grid grid-cols-1 lg:grid-cols-2 gap-6 my-5">
                <div className="rounded-2xl border border-slate-800 p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Chamados por intervalo de tempo
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer className="bg-white" width="100%" height="100%">
                            <BarChart data={dadosIntervalo} >
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
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-800 p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Chamados por tipo
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer className="bg-white" width="100%" height="100%">
                            <BarChart data={dadosTipo} >
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
                    </div>
                </div>
            </section>
        </AdminWebLayout>
    );
};

export { IndicadorProfissionalPage };
