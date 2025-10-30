type leitosInPut = {
    nome?: string,
    idSetor?: number,
    status?: string,
    ativo?: boolean
}

type leitosOutPut = {
    data: leitosAdmin[]
}

type leitosAdmin = {
    Id: number,
    Nome: string,
    Descricao?: string,
    IdSetor: number,
    SetorNome: string,
    Status: "Ocupado" | "Manutenção" | "Disponível",
    Ativo: boolean
}

export type { leitosInPut, leitosOutPut, leitosAdmin };