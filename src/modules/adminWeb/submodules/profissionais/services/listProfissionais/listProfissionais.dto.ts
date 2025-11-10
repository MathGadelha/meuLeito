type listProfissionaisInput = {
    page: number;
    pageSize: number;
    nome: string
}

type listProfissionaisOutput = {
    data: userData[];
    page: number;
    pageSize: number;
    total: number;
}

type userData = {
    Id: number,
    Nome: string,
    CPF: string,
    Nascimento: string,
    Sexo: "M" | "F",
    Telefone: string | null,
    Perfil: string,
    IdPerfil: number
    Setores: {
        Id: number,
        Nome: string
    }[]
}


export type { listProfissionaisInput, listProfissionaisOutput, userData };