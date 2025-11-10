import { AxiosInstance } from "axios";
import { http } from "@api/https";

class AltaPacienteService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string): Promise<void> {
        await this.api.put(`/joins/liberacao/${id}`)
    }
}

const altaPacienteService = new AltaPacienteService(http)
export { altaPacienteService };
