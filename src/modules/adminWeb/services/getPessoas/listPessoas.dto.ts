
type listPessoasOutput = {
    data: userData[];
}

type userData = {
    id: number,
    cpf: number,
    nome: string,
    nascimento: string,
    telefone: string | null,
    sexo: string,
    estado_civil: string | null,
    naturalidade: string | null,
    nacionalidade: string | null,
    uf: string | null,
    endereco: string | null,
    email: string | null,
    criado_em: string,
    atualizado_em: string
}

export type { listPessoasOutput, userData };