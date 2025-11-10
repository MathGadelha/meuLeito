type listPacientesInput = {
    page: number;
    pageSize: number;
    nome: string
}

type listPacientesOutput = {
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
    Altura: string | null,
    Peso: string | null,
    TipoSanguineo: string | null
}


export type { listPacientesInput, listPacientesOutput, userData };