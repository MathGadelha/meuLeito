import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { postPacienteInput, postPacienteOutput } from "./postPaciente.dto";

class PacienteService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: postPacienteInput): Promise<postPacienteOutput> {
        const response = await this.api.post<postPacienteOutput>("/pacientes", params);

        return response.data;
    }
}

const usePacienteService = new PacienteService(http);

export { usePacienteService };