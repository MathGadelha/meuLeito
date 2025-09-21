import { AdminWebLayout } from "@modules/adminWeb/components/layout";
import { HeaderTasks } from "../components/header";
import { DataTable } from "@components/dataTable";
import { columnsProfissionais } from "../components/profissionaisTableColumns";
import { profissionais } from "../mocks/profissionais";

const IndicadorProfissionalPage = () => {
    return (
        <AdminWebLayout>
            <p className="font-semibold text-xl">Acompanhamento de profissionais</p>
            <p className="text-slate-300">Acompanhe o desempenho dos profissionais aqui.</p>
            <HeaderTasks />
            <div>
                <DataTable
                    columns={columnsProfissionais}
                    data={profissionais}
                />
            </div>

        </AdminWebLayout>
    );
};

export { IndicadorProfissionalPage };
