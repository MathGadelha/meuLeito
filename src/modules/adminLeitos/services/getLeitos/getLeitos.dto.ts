type leitosInPut = {
    nome?: string,
    id_setor?: number,
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
    NomeSetor: string,
    Status: "Ocupado" | "Manutenção" | "Disponível" | "Livre",
    Ativo: boolean,
    nome_leito: string
}

export type { leitosInPut, leitosOutPut, leitosAdmin };