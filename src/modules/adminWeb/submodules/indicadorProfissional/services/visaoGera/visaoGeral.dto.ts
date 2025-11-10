type visaoInput = {
    id_setor?: string
}

type visaoOutput = {
    total_chamados?: number,
    pendentes?: number,
    pendentes_pct?: number,
    aceitos?: number,
    aceitos_pct?: number,
    aceitos_sem_conclusao?: number,
    aceitos_sem_conclusao_pct?: number,
    sem_resposta?: number,
    sem_resposta_pct?: number,
    concluidos?: number,
    concluidos_pct?: number,
    cancelados?: number,
    cancelados_pct?: number
}

export type { visaoOutput, visaoInput }