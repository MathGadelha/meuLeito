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
}


export type { listProfissionaisOutput, userData };