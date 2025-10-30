type comorbidadesInPut = {
    nome?: string;
}

type comorbidadesOutPut = {
    data: comorbidadesData[];
}

type comorbidadesData = {
    Id: number;
    Nome: string;
}

export type { comorbidadesInPut, comorbidadesOutPut, comorbidadesData };