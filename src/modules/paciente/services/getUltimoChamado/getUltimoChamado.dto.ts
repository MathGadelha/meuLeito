type chamadosInput = {
    id_leito: string;
}

type chamadosOutput = {
    data: ultimoChamadoData
}

type ultimoChamadoData = {
    chamadoId?: number;
    mensagem?: string | null;
    tipo?: string | null
    prioridade?: string | null;
    hora?: string;
    status?: string;
}

export type { chamadosInput, chamadosOutput, ultimoChamadoData };