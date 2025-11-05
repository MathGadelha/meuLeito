import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";
import { errorHandler } from "@api/errorHandler";
import { useUserContext } from "@shared/context/user/useUserContext";
import { useState } from "react";
import { Button } from "@components/ui/button";

type dialogProp = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
};

const SetorDialog = ({ isOpen, onOpenChange }: dialogProp) => {

    const { user } = useUserContext();
    const [setorSelected, setSetorSelected] = useState<{ Id: number; Nome: string } | null>(null);
    async function onSubmit() {
        try {
            localStorage.setItem("@setorSelected", JSON.stringify(setorSelected));
            onOpenChange(false)
        } catch (error) {
            errorHandler(error);
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
                        Selecione o setor no qual você está atuando agora.
                    </DialogTitle>

                    <DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
                        <div className="grid grid-cols-3 gap-4">
                            {user.value.setores.map((s: any) => {
                                const id = s.Id ?? s.IdSetor ?? s.id ?? s.idSetor;
                                const nome = s.Nome ?? s.NomeSetor ?? s.nome ?? s.nomeSetor;

                                if (id == null) return null;

                                const isActive = setorSelected?.Id === id;

                                return (
                                    <div key={id} className="my-2">
                                        <button
                                            onClick={() => setSetorSelected({ Id: id, Nome: nome })}
                                            className={`w-full text-left p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 ${isActive ? "border border-blue-500 font-semibold" : ""
                                                }`}
                                        >
                                            {nome}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>


                        <Button className="mt-4" onClick={onSubmit} disabled={!setorSelected}>
                            Enviar
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export { SetorDialog };
