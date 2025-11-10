import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { chamadosInput, chamadosOutput } from "./getChamados.dto";

class getChamados {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: chamadosInput): Promise<chamadosOutput> {
        const response = await this.api.get<chamadosOutput>("/chamados/chamados-pendentes", { params });

        return response.data;
    }
}

const useGetChamados = new getChamados(http);

export { useGetChamados };