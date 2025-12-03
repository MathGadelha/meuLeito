import { chamadosData } from "../../types/chamados.dto"

type chamadosSetorInput = {
    init: string;
    fim: string;
    id_setor: number;
}


type chamadosSetorOutPut = {
    data: chamadosData[]
}

export type { chamadosSetorInput, chamadosSetorOutPut }