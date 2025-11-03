type listPacienteLeitoOutput = {
    data: pacienteLeitoData[];
}

type pacienteLeitoData = {
    ip_paciente: number,
    IdSetor: number,
    IdLeito: number,
    Nome: string,
    CPF: string,
    Nascimento: string,
    Sexo: "M" | "F",
    DataEntrada: string,
    nome_leito: string
}


export type { listPacienteLeitoOutput, pacienteLeitoData };