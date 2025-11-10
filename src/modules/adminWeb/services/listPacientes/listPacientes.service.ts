import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { listPacientesInput, listPacientesOutput } from "./listPacientes.dto";

class listPacientes {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: listPacientesInput): Promise<listPacientesOutput> {
        const response = await this.api.get<listPacientesOutput>("/pacientes", { params });

        return response.data;
    }
}

const ListPacientes = new listPacientes(http);

export { ListPacientes };