type chamadosTipoInput = {
    init?: string;
    fim?: string;
    id_setor?: number;
}


type chamadosTipoOutPut = {
    tipo: string;
    total: number;
}

export type { chamadosTipoInput, chamadosTipoOutPut }