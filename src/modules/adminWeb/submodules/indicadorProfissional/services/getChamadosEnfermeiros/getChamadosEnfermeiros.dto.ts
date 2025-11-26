import { chamadosData } from "../../types/chamados.dto"

type chamadosEnfermeirosInput = {
    page: number;
    pageSize: number;
}


type chamadosEnfermeirosOutPut = {
    data: chamadosData[]
    page: number;
    pageSize: number;
}

export type { chamadosEnfermeirosInput, chamadosEnfermeirosOutPut }