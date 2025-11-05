import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { chamadosInput } from "./getChamados.dto";

class getChamados {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: chamadosInput): Promise<any> {
        const response = await this.api.get<any>("/chamados", { params });

        return response.data;
    }
}

const useGetChamados = new getChamados(http);

export { useGetChamados };