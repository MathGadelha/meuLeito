type chamadosInput = {
    id_leito: string;
}

type chamadosOutput = {
    id_leito: string;
    chamados: Array<{
        id: string;
        descricao: string;
        status: string;
    }>
}

export type { chamadosInput, chamadosOutput };