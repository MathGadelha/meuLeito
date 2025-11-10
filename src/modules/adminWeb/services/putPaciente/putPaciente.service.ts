import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { putPacienteInput } from "./putPaciente.dto";

class EditPacienteService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string, params: putPacienteInput): Promise<void> {
        await this.api.put(`/pacientes/${id}`, params)
    }
}

const editPacienteService = new EditPacienteService(http)
export { editPacienteService };
