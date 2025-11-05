type listProfissionaisOutput = {
    data: userData[];
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


export type { listProfissionaisOutput, userData };