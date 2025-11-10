import { AdminWebLayout } from "@modules/adminWeb/components/layout";
import { useEffect, useState } from "react";
import { useVisaoGeral } from "../services/visaoGera/visaoGeral.service";
import { HeaderCard } from "@modules/leitos/components/headerCard";
import { errorHandler } from "@api/errorHandler";
import { visaoOutput } from "../services/visaoGera/visaoGeral.dto";
import { FilterPopover } from "@components/filter/Filter";
import { useGetSetores } from "../../setores/services/getSetores/getSetores.service";

type FilterOptions = {
    id: string;
    label: string;
}

const IndicadorProfissionalPage = () => {

    const [dados, setDados] = useState<visaoOutput>({} as visaoOutput)
    const [idSetor, setIdSetor] = useState<number>();
    const [setores, setSetores] = useState<FilterOptions[]>([]);

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

    useEffect(() => {
        const debounce = setTimeout(() => {
            getVisaoGeral();
        }, 750);

        return () => clearTimeout(debounce);
    }, [idSetor])

    useEffect(() => {
        getVisaoGeral()
        listSetores()
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
            {/* <div>
                <DataTable
                    columns={columnsProfissionais}
                    data={profissionais}
                />
            </div> */}

        </AdminWebLayout>
    );
};

export { IndicadorProfissionalPage };
