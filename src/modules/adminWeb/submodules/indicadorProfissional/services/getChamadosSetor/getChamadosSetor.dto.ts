type chamadosSetorInput = {
    init?: string;
    fim?: string;
    id_setor?: number;
}


type chamadosSetorOutPut = {
    id_setor: number;
    nome_setor: string;
    total: number;
}

export type { chamadosSetorInput, chamadosSetorOutPut }