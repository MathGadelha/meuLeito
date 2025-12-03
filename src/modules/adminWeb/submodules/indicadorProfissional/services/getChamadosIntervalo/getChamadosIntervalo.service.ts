import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { chamadosIntervaloInput, chamadosIntervaloOutPut } from "./getChamadosIntervalo.dto";

class ChamadosIntervalo {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params?: chamadosIntervaloInput): Promise<chamadosIntervaloOutPut[]> {
        const response = await this.api.get<chamadosIntervaloOutPut[]>("/kpis/intervalos-chamados", { params });

        return response.data;
    }
}

const useChamadosIntervalo = new ChamadosIntervalo(http);

export { useChamadosIntervalo };