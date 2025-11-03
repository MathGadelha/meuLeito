type listPacientesOutput = {
    data: userData[];
}

type userData = {
    Id: number,
    Nome: string,
    CPF: string,
    Nascimento: string,
    Sexo: "M" | "F",
    Telefone: string | null,
    Altura: string | null,
    Peso: string | null,
    TipoSanguineo: string | null
}


export type { listPacientesOutput, userData };