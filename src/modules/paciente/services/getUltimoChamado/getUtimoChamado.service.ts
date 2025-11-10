import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { chamadosInput, chamadosOutput } from "./getUltimoChamado.dto";

class getUltimoChamado {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: chamadosInput): Promise<chamadosOutput> {
        const response = await this.api.get<chamadosOutput>("/chamados/ultimo-chamado", { params });

        return response.data;
    }
}

const useGetUltimoChamado = new getUltimoChamado(http);

export { useGetUltimoChamado };