import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { inserirPacienteInput } from "./inserirPaciente.dto";

class inserirPacienteService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: inserirPacienteInput): Promise<void> {
        const response = await this.api.post<void>("/joins/alocacao", params);

        return response.data;
    }
}

const useInserirPacienteService = new inserirPacienteService(http);

export { useInserirPacienteService };