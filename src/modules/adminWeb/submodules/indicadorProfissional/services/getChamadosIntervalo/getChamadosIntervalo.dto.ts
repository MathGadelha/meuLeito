type chamadosIntervaloInput = {
    init?: string;
    fim?: string;
    id_setor?: number;
}


type chamadosIntervaloOutPut = {
    label: string;
    total: number;
}

export type { chamadosIntervaloInput, chamadosIntervaloOutPut }