import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { chamadosTipoInput, chamadosTipoOutPut } from "./getChamadosTipo.dto";

class ChamadosTipo {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params?: chamadosTipoInput): Promise<chamadosTipoOutPut[]> {
        const response = await this.api.get<chamadosTipoOutPut[]>("/kpis/intervalos-tipos", { params });

        return response.data;
    }
}

const useChamadosTipo = new ChamadosTipo(http);

export { useChamadosTipo };