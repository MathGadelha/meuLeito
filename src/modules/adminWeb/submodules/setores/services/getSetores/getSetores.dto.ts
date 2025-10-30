type setoresInPut = {
    nome?: string;
}

type setoresOutPut = {
    data: setor[];
}

type setor = {
    Id: number;
    Nome: string;
}

export type { setoresInPut, setoresOutPut, setor };