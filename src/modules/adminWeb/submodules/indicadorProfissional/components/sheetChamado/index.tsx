import { Sheet, SheetContent } from "@components/ui/sheet";
import { chamadosData } from "../../types/chamados.dto";


type sheetProp = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    chamadoSelected: chamadosData
};

const ChamadoSheet = ({ isOpen, onOpenChange, chamadoSelected
}: sheetProp) => {



    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent>
                <p>
                    {chamadoSelected.nome}
                </p>
            </SheetContent>
        </Sheet>
    );
};

export { ChamadoSheet };
