import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { visaoInput, visaoOutput } from "./visaoGeral.dto";

class VisaoGeral {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params?: visaoInput): Promise<visaoOutput> {
        const response = await this.api.get<visaoOutput>("/kpis/visao-geral", { params });

        return response.data;
    }
}

const useVisaoGeral = new VisaoGeral(http);

export { useVisaoGeral };