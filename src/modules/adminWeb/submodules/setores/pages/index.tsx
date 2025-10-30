import { DataTable } from "@components/dataTable";
import { AdminWebLayout } from "@modules/adminWeb/components/layout";
import { Search } from "lucide-react";
import { ActionButton } from "@components/types/ActionButton";
import { useEffect, useState } from "react";
import { useGetSetores } from "../services/getSetores/getSetores.service";
import { setor } from "../services/getSetores/getSetores.dto";
import { errorHandler } from "@api/errorHandler";
import { Input } from "@components/ui/input";
import { columnsSetores } from "../components/setoresTableColumns";
import { RiEdit2Fill } from "react-icons/ri";
import { SetoresDialog } from "../components/setoresDialog";
import { Button } from "@components/ui/button";
import { FaPlus } from "react-icons/fa";


const SetoresPage = () => {

    const [openSetorDialog, setOpenSetorDialog] = useState(false);
    const [setores, setSetores] = useState<setor[]>([]);
    const [setorSelected, setSetorSelected] = useState<setor>();
    const [loading, setLoading] = useState(false);
    const [tipo, setTipo] = useState<"C" | "E">("C");

    const actionButton: ActionButton[] = [
        {
            label: "Editar Setor",
            icon: <RiEdit2Fill size={20} />,
            onClick: (row: setor) => {
                setTipo("E");
                setSetorSelected(row);
                setOpenSetorDialog(true);
            },
        },
    ];

    async function listSetores(search?: string) {
        try {
            setLoading(true);
            const params = {
                nome: search,
            }
            const result = await useGetSetores.execute(params);
            setSetores(result.data);
        } catch (error) {
            errorHandler(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        listSetores();
    }, [])

    return (
        <AdminWebLayout>
            <p className="font-semibold text-xl">Gerenciamento de Setores</p>
            <p className="text-slate-300">Gerencie os setores hospitalares aqui.</p>
            <div>
                <div className="flex flex-row justify-between">
                    <div className="flex items-center gap-2 mb-4 border rounded-lg w-1/4">
                        <Search size={20} className="ml-4" />
                        <Input
                            className="w-full  border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            onChange={(e) => {
                                const debounce = setTimeout(() => {
                                    listSetores(e.target.value);
                                }, 750);

                                return () => clearTimeout(debounce);
                            }}
                            placeholder="Pesquise uma pessoa por nome"
                        />
                    </div>
                    <Button className="bg-primary gap-2" onClick={() => {
                        setTipo("C");
                        setSetorSelected(undefined);
                        setOpenSetorDialog(true);
                    }}>
                        <FaPlus />Adicionar Setor
                    </Button>
                </div>
                <DataTable
                    actions={actionButton}
                    columns={columnsSetores}
                    data={setores}
                    isLoading={loading}
                />
            </div>
            {openSetorDialog && <SetoresDialog isOpen={openSetorDialog} onOpenChange={setOpenSetorDialog} setorSelected={setorSelected} tipo={tipo} onSend={() => { listSetores(); setOpenSetorDialog(false); }} />}
        </AdminWebLayout >
    );
};

export { SetoresPage };
