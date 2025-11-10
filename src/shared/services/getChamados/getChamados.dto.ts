type chamadosInput = {
    id_setor: string;
}

type chamadosOutput = {
    data: chamadoData[]
}

type chamadoData = {
    chamadoId: number;
    setorId?: number | string;
    pacienteLeitoId?: number;
    prioridade?: string | null;
    mensagem?: string | null;
    hora?: string;
    nomePaciente?: string;
    nomeLeito?: string;
}

export type { chamadosInput, chamadosOutput, chamadoData };