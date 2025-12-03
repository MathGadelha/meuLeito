import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { chamadosSetorInput, chamadosSetorOutPut } from "./getChamadosSetor.dto";

class ChamadosSetor {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params?: chamadosSetorInput): Promise<chamadosSetorOutPut> {
        const response = await this.api.get<chamadosSetorOutPut>("/kpis/intervalos-chamados", { params });

        return response.data;
    }
}

const useChamadosSetor = new ChamadosSetor(http);

export { useChamadosSetor };