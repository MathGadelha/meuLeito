import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { listPacienteLeitoOutput } from "./getPacienteLeito.dto";

class getPacienteLeitos {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string): Promise<listPacienteLeitoOutput> {
        const response = await this.api.get<listPacienteLeitoOutput>(`/leitos/paciente-leito/${id}`);

        return response.data;
    }
}

const useGetPacienteLeitos = new getPacienteLeitos(http);

export { useGetPacienteLeitos };
