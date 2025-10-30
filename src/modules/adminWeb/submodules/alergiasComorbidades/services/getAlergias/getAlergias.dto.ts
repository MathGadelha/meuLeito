type alergiasInPut = {
    nome?: string;
}

type alergiasOutPut = {
    data: alergiasData[];
}

type alergiasData = {
    Id: number;
    Nome: string;
}

export type { alergiasInPut, alergiasOutPut, alergiasData };