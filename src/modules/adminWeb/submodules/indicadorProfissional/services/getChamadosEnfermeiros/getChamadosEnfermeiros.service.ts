import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { chamadosEnfermeirosInput, chamadosEnfermeirosOutPut } from "./getChamadosEnfermeiros.dto";

class ChamadosEnfermeiros {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params?: chamadosEnfermeirosInput): Promise<chamadosEnfermeirosOutPut> {
        const response = await this.api.get<chamadosEnfermeirosOutPut>("/kpis/chamado-enfermeiros", { params });

        return response.data;
    }
}

const useChamadosEnfermeiros = new ChamadosEnfermeiros(http);

export { useChamadosEnfermeiros };