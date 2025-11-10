type listPacienteLeitoOutput = {
    data: pacienteLeitoData[];
}

type pacienteLeitoData = {
    Id: number,
    IdPaciente: number,
    NomePaciente: string,
    CPFPaciente: string,
    IdLeito: number,
    NomeLeito: string,
    IdSetor: number,
    NomeSetor: string,
    DataEntrada: string,
    DataSaida: string | null
    SexoPaciente: string,
    NascimentoPaciente: string,
}


export type { listPacienteLeitoOutput, pacienteLeitoData };