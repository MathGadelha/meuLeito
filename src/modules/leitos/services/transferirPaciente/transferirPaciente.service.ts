import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { transferirPacienteInput } from "./transferirPaciente.dto";


class TransferirPacienteService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string, params: transferirPacienteInput): Promise<void> {
        await this.api.put(`/joins/alocacao/${id}`, params)
    }
}

const transferirPacienteService = new TransferirPacienteService(http)
export { transferirPacienteService };
