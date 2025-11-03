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
    nome_setor: string,
    Status: "Ocupado" | "Manutenção" | "Disponível" | "Livre",
    Ativo: boolean,
    nome_leito: string
}

export type { leitosInPut, leitosOutPut, leitosAdmin };